import { auth } from '@/adapters/auth'
import { Credential } from '@/adapters/auth/types'
import { HTTPResponse } from '@/adapters/serverHTTP/types'
import { database } from '@/adapters/database'

type SettingsLogin = {
    params: {
        email: string
        password: string
    }
}

export const loginCaseUse = async (settings: unknown): Promise<HTTPResponse> => {
  try {

    const s = settings as SettingsLogin

    const UserModel = database.models.User()
    const credential = await UserModel.findByEmail(s.params.email) as unknown as Credential
    
    if (!credential) {
      return {
        result: {},
        status: 'user-or-password-not-found'
      } 
    }

    const isSuccessful = auth.login(s.params.email, s.params.password, credential)

    return {
      result: {},
      status: isSuccessful ? 'ok' : 'error'
    }

  } catch (e) {
    console.error(e)
    return {
      result: {},
      status: 'internal-error'
    }        
  }
}
