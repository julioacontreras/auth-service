import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { ResponsePrepareRegister } from '@/adapters/auth/types'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { database } from '@/adapters/database'
import { UserEntity } from '@/domains/types/User'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

type SettingsRegister = {
    body: {
      name: string
      email: string
      password: string
      type: string
    }
}

async function thisEmailExists (email: string): Promise<boolean> {
  const userModel = database.models.User()
  const user = await userModel.findByEmail<UserEntity>(email)
  return Boolean(user)
}

export const registerCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {
    const s = settings as SettingsRegister

    const result = await auth.prepareToRegister(
      {
        email: s.body.email, 
        password: s.body.password,
        salt: ''
      },
      thisEmailExists
    ) as ResponsePrepareRegister

    const userModel = database.models.User()
    userModel.register<UserEntity>({
      name: s.body.name,
      email: s.body.email,
      password: result.password,
      type: s.body.type,
      salt: result.salt,
      city: '',
      aboutMe: '',
      rating: 0,
      coins: 0,
      createAt: '',
      enabled: false
    })

    return {
      response: {
        token: result.accessToken
      },
      code: statusHTTP.OK
    }

  } catch (e) {
    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR  
  }

}
