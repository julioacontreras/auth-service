import { Credential, FunctionEmailExist } from '../../../adapters/auth/types'
import { ResponsePrepareRegister } from '../../../adapters/auth/types'
import { TOKEN_SECRET } from './constants'

import { useSecurity } from './services/security'
import { useToken } from './services/token'

export async function prepareToRegister (
  credential: Credential,
  thisEmailExistis: FunctionEmailExist,
): Promise<ResponsePrepareRegister> {
  const tokenSecret = TOKEN_SECRET

  if (!tokenSecret) {
    throw 'Dont have secret token'
  }

  if (await thisEmailExistis(credential.email)) {
    throw 'Email exist, is not possible create user'
  }
    
  const {
    generateSalt,
    generateHash,
    verifyHash
  } = useSecurity()

  const passwordPlain = credential.password

  credential.salt = generateSalt()
  credential.password = generateHash( passwordPlain + credential.salt)

  if (!verifyHash(passwordPlain + credential.salt, credential.password)) {
    throw 'Error generating hash'
  }

  const { generateAccessToken } = useToken(tokenSecret)

  return {
    salt: credential.salt,
    password: credential.password,
    accessToken: generateAccessToken(credential.email)
  }
}
