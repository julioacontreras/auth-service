import { auth } from '@/adapters/auth'
import { ResponsePrepareRegister } from '@/adapters/auth/types'

import { HTTPReturn } from '@/adapters/serverHTTP/types'
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
    userModel.register({
      name: s.body.name,
      email: s.body.email,
      password: result.password,
      type: s.body.type,
      salt: result.salt,
      createAt: ''
    })

    return {
      response: {
        result: { accessToken: result.accessToken },
        status: 'ok'
      }
    }

  } catch (e) {
    console.error(e)
    return {
      response: {
        result: {},
        status: 'user-already-exists'
      }
    }        
  }

}
