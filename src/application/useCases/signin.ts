import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { Credential } from '@/adapters/auth/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { database } from '@/adapters/database'
import { User } from '@/domains/types/User'

import { 
  RESPONSE_UNAUTHORIZED,
  RESPONSE_INTERNAL_SERVER_ERROR,
  RESPONSE_NO_PASSWORD,
  RESPONSE_WAIT_LIST
} from './responses'

type SettingsLogin = {
    body: {
        email: string
        password: string
    }
}

export const signinCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {
    const s = settings as SettingsLogin
    const UserModel = database.models.User()
    const credential = await UserModel.findByEmail<User>(s.body.email) as unknown as Credential

    if (!credential) return RESPONSE_UNAUTHORIZED
    if (!credential.password) return RESPONSE_NO_PASSWORD
    if (!credential.enabled) return RESPONSE_WAIT_LIST

    const accessToken = auth.login(s.body.email, s.body.password, credential)

    return {
      response: {
        token: accessToken,
        url: '/cities'
      },
      code: statusHTTP.OK
    }

  } catch (e) {
    logger.error(e as string)
    return RESPONSE_INTERNAL_SERVER_ERROR  
  }
}
