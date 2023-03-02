import { logger } from '../../adapters/logger'
import { auth } from '../../adapters/auth'
import { ResponsePrepareRegister } from '../../adapters/auth/types'
import { HTTPReturn } from '../../adapters/serverHTTP/types'
import { statusHTTP } from '../../adapters/serverHTTP'
import { database } from '../../adapters/database'
import { getSchemaRequestRegister, prepareErrorParamsRequest } from '../../domain/shared/validate'

type SettingsRegister = {
    body: {
      name: string
      email: string
      password: string
      type: string
    }
}

async function thisEmailExists (email: string): Promise<boolean> {
  const userModel = database.models.User()
  const user = await userModel.findByEmail(email)
  return Boolean(user)
}

/**
 * @api {post} /api/auth/register User register
 * @apiName register
 * @apiGroup Auth
 *
 * @apiBody {string} name Name
 * @apiBody {string} email Email
 * @apiBody {string} password Password
 * @apiBody {string} type Type account
 *
 */
export const registerCaseUse = async (request: SettingsRegister): Promise<HTTPReturn> => {
  const schema = getSchemaRequestRegister()
  const { error } = schema.validate(request.body)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }

  try {
    const result = await auth.prepareToRegister(
      {
        email: request.body.email, 
        password: request.body.password,
        salt: ''
      },
      thisEmailExists
    ) as ResponsePrepareRegister

    const userModel = database.models.User()
    const response = await userModel.register({
      email: request.body.email,
      password: result.password,
      salt: result.salt,
      createAt: new Date().getTime()
    })

    return {
      response: {
        token: result.accessToken,
        id: response.id
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
