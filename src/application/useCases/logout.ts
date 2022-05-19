import { auth } from '@/adapters/auth'
import { HTTPReturn } from '@/adapters/serverHTTP/types'

export const logoutCaseUse = (): HTTPReturn => {
  try {
    const logout = auth.useLogout(() => { return true })

    const isSuccessful = logout()
    return {
      response: {
        result: {},
        status: isSuccessful ? 'ok' : 'usert-not-found'
      }
    }

  } catch(e) {
    console.error(e)
    return {
      response: {
        result: {},
        status: 'internal-error'
      }
    }
  }
}
