import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { ResponsePrepareRegister } from '@/adapters/auth/types'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { database } from '@/adapters/database'

import { User } from '@/domains/types/User'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

type SettingsRegister = {
    body: {
      apiKey: string
      password: string
      email: string
    }
}

export const resetPasswordCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {
    const s = settings as SettingsRegister
    const userModel = database.models.User()
    const user = await userModel.findByEmail(s.body.email) as User

    if (!user?._id) { throw 'Email not exist, is not possible create password' }

    const result = await auth.createPassword(
      s.body.password,
      s.body.email
    ) as ResponsePrepareRegister

    await userModel.update<User>(
      user._id,
      {
        password: result.password,
        salt: result.salt
      } as User)

    if (!user.enabled) {
      return {
        response: {
          url: '/response/waiting-list'
        },
        code: statusHTTP.OK
      }        
    }

    return {
      response: {
        accessToken: result.accessToken,
        url: '/cities'
      },
      code: statusHTTP.OK
    }

  } catch (e) {
    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR  
  }
}
