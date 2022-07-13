import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { ResponsePrepareRegister } from '@/adapters/auth/types'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { database } from '@/adapters/database'
import { User } from '@/domains/types/User'
import { Password } from '@/domains/types/Password'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

type SettingsRegister = {
    body: {
      name: string
      email: string
      password: string
      type: string
    }
}

export const createPasswordCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {
    const s = settings as SettingsRegister

    const result = await auth.createPassword(
      s.body.password,
      s.body.email
    ) as ResponsePrepareRegister

    const userModel = database.models.User()

    const user = await userModel.findByEmail(s.body.email) as User

    if (user._id) {
      userModel.update<Password>(
        user._id,
        {
          password: result.password,
          salt: result.salt
        }
      )
    }

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
