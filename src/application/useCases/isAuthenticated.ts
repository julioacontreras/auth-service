import { auth } from '@/adapters/auth'
import { HTTPReturn } from '@/adapters/serverHTTP/types'

type SettingsRegister = {
    body: {
      accessToken: string
      email: string
    }
}

export const isAuthenticatedCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  const s = settings as SettingsRegister

  return {
    response: {
      result: {
        isSuccessful: await auth.isAuthenticated(s.body.accessToken)
      },
      status: 'ok'
    },
    code: 200
  }  
}
