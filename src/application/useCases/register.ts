import { logger } from '@/adapters/logger'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { database } from '@/adapters/database'
import { User } from '@/domains/types/User'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

type SettingsRegister = {
    body: {
      name: string
      email: string
      type: string
    }
}

export const registerCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {
    const s = settings as SettingsRegister

    const userModel = database.models.User()

    const user = await userModel.findByEmail(s.body.email)
    if (user) {
      return {
        response: {},
        code: statusHTTP.UNAUTHORIZED
      }  
    }

    await userModel.register<User>({
      name: s.body.name,
      email: s.body.email,
      type: s.body.type,
      password: '',
      salt: '',
      city: '',
      aboutMe: '',
      rating: 0,
      coins: 0,
      createAt: '',
      enabled: false
    })

    return {
      response: {},
      code: statusHTTP.OK
    }

  } catch (e) {
    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR  
  }

}
