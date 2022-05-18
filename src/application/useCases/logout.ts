import { auth } from '@/adapters/auth'
import { HTTPResponse } from '@/adapters/serverHTTP/types'

export const logoutCaseUse = (): HTTPResponse => {
  try {
    const logout = auth.useLogout(() => { return true })

    const isSuccessful = logout()
    return {
      result: {},
      status: isSuccessful ? 'ok' : 'usert-not-found'
    }

  } catch(e) {
    console.error(e)
    return {
      result: {},
      status: 'internal-error'
    }
  }
}
