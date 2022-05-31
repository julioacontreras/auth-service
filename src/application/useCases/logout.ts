import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { statusHTTP } from '@/adapters/serverHTTP'
import { HTTPReturn } from '@/adapters/serverHTTP/types'

import { RESPONSE_INTERNAL_SERVER_ERROR } from './responses'

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
    return RESPONSE_INTERNAL_SERVER_ERROR
  }
}
