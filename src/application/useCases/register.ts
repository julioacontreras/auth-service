import { logger } from '@/adapters/logger'
import { auth } from '@/adapters/auth'
import { ResponsePrepareRegister } from '@/adapters/auth/types'
import { HTTPReturn } from '@/adapters/serverHTTP/types'
import { statusHTTP } from '@/adapters/serverHTTP'
import { database } from '@/adapters/database'

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

export const registerCaseUse = async (settings: unknown): Promise<HTTPReturn> => {
  try {
    const s = settings as SettingsRegister

    const result = await auth.prepareToRegister(
      {
        email: s.body.email, 
        password: s.body.password,
        salt: ''
      },
      thisEmailExists
    ) as ResponsePrepareRegister

    const userModel = database.models.User()
    const response = await userModel.register({
      email: s.body.email,
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
