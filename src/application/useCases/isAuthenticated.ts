import { logger } from '../../adapters/logger'
import { HTTPReturn } from '../../adapters/serverHTTP/types'
import { auth } from '../../adapters/auth'
import { statusHTTP } from '../../adapters/serverHTTP'
import { getSchemaRequestIsAuthenticated, prepareErrorParamsRequest } from '../../domain/shared/validate'

type SettingsIsAuthenticated = {
    body: {
      accessToken: string
      email: string
    }
}

/**
 * @api {post} /api/auth/is-authenticated Is authenticated
 * @apiName is authenticated
 * @apiGroup Auth
 *
 * @apiBody {string} accessToken Access token
 * @apiBody {string} email Email
 *
 */
export const isAuthenticatedCaseUse = async (request: SettingsIsAuthenticated): Promise<HTTPReturn> => {
  const schema = getSchemaRequestIsAuthenticated()
  const { error } = schema.validate(request.body)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }


  try {
    return {
      response: {},
      code: await auth.isAuthenticated(request.body.accessToken) ? statusHTTP.OK : statusHTTP.UNAUTHORIZED
    }    
  } catch(e) {
    logger.error(e as string)
    return {
      response: {},
      code: statusHTTP.INTERNAL_SERVER_ERROR
    }    
  }
}
