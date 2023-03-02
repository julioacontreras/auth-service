import { logger } from '../../adapters/logger'
import { auth } from '../../adapters/auth'
import { Credential } from '../../adapters/auth/types'
import { statusHTTP } from '../../adapters/serverHTTP'
import { HTTPReturn } from '../../adapters/serverHTTP/types'
import { database } from '../../adapters/database'
import { getSchemaRequestLogin, prepareErrorParamsRequest } from '../../domain/shared/validate'

type SettingsLogin = {
    body: {
        email: string
        password: string
    }
}

/**
 * @api {post} /api/auth/login User login
 * @apiName login
 * @apiGroup Auth
 *
 * @apiBody {string} email Email
 * @apiBody {string} password Password
 *
 */
export const loginCaseUse = async (request: SettingsLogin): Promise<HTTPReturn> => {
  const schema = getSchemaRequestLogin()
  const { error } = schema.validate(request.body)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }

  try {
    const UserModel = database.models.User()
    const credential = await UserModel.findByEmail(request.body.email) as unknown as Credential
    
    if (!credential) {
      return {
        response: {},
        code: statusHTTP.UNAUTHORIZED 
      } 
    }

    const accessToken = auth.login(request.body.email, request.body.password, credential)

    return {
      response: {
        token: accessToken,
        id: credential._id
      },
      code: statusHTTP.OK
    }

  } catch (e) {
    logger.error(e as string)
    return {
      response: {},
      code: statusHTTP.INTERNAL_SERVER_ERROR
    }        
  }
}
