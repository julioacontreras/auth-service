import { logger } from '@/adapters/logger'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { auth } from '@/adapters/auth'
import { statusHTTP } from '@/adapters/serverHTTP'

type SettingsRegister = {
    body: {
      accessToken: string
      email: string
    }
}

export const isAuthenticatedCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  const s = settings as SettingsRegister
  try {
    return {
      response: {},
      code: await auth.isAuthenticated(s.body.accessToken) ? statusHTTP.OK : statusHTTP.UNAUTHORIZED
    }    
  } catch(e) {
    logger.error(e as string)
    return {
      response: {},
      code: statusHTTP.INTERNAL_SERVER_ERROR
    }    
  }
}
