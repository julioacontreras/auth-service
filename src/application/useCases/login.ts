import { auth } from '@/adapters/auth'
import { Credential } from '@/adapters/auth/types'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { database } from '@/adapters/database'

type SettingsLogin = {
    body: {
        email: string
        password: string
    }
}

export const loginCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {

    const s = settings as SettingsLogin

    const UserModel = database.models.User()
    const credential = await UserModel.findByEmail(s.body.email) as unknown as Credential
    
    if (!credential) {
      return {
        response: {
          result: {},
          status: 'user-or-password-not-found'  
        }
      } 
    }

    const accessToken = auth.login(s.body.email, s.body.password, credential)

    return {
      response: {
        result: {
          accessToken
        },
        status: accessToken ? 'ok' : 'error'
      },
      session: {
        email: s.body.email
      }
    }

  } catch (e) {
    console.error(e)
    return {
      response: {
        result: {},
        status: 'internal-error'
      }
    }        
  }
}
