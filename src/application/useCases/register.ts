import { auth } from '@/adapters/auth'
import { HTTPResponse } from '@/adapters/serverHTTP/types'

type SettingsLogin = {
    params: {
        email: string
        password: string
    }
}

export const register = (settings: unknown): HTTPResponse => {
  /*
  try {

    const s = settings as SettingsLogin
    // const isSuccessful = auth.login(s.params.email, s.params.password, {})

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
  */
  return {
    result: {},
    status: 'internal-error'
  }        
}
