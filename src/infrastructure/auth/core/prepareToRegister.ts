import { Credential, FunctionEmailExist } from '@/adapters/auth/types'
import { useSecurity } from './services/security'
import { useToken } from './services/token'

export function prepareToRegister (
  credential: Credential,
  thisEmailExistis: FunctionEmailExist,
) {
  const secretToken = process.env.SECRET_TOKEN

  if (!secretToken) {
    throw 'Dont have secret token'
  }

  if (thisEmailExistis(credential.email)) {
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

  const { generateAccessToken } = useToken(secretToken)

  return generateAccessToken(credential.email)
}
