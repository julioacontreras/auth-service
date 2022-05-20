import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { statusHTTP } from '@/adapters/serverHTTP'
import { HTTPReturn } from '@/adapters/serverHTTP/types'

export const logoutCaseUse = (): HTTPReturn => {
  try {
    const logout = auth.useLogout(() => { return true })

    const isSuccessful = logout()
    return {
      response: {},
      code: isSuccessful ? statusHTTP.OK : statusHTTP.UNAUTHORIZED
    }

  } catch(e) {
    logger.error(e as string)
    return {
      response: {},
      code: statusHTTP.INTERNAL_SERVER_ERROR
    }
  }
}
