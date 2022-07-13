import { useSecurity } from './services/security'
import { useToken } from './services/token'
import { ResponsePrepareRegister } from '@/adapters/auth/types'

export async function createPassword (passwordPlain: string, email: string): Promise<ResponsePrepareRegister> {
  const tokenSecret = process.env.TOKEN_SECRET
  if (!tokenSecret) throw 'Dont have secret token'
    
  const {
    generateSalt,
    generateHash,
    verifyHash
  } = useSecurity()

  const salt = generateSalt()
  const password = generateHash( passwordPlain + salt)

  if (!verifyHash(passwordPlain + salt, password)) throw 'Error generating hash'

  const { generateAccessToken } = useToken(tokenSecret)

  return {
    salt: salt,
    password: password,
    accessToken: generateAccessToken(email)
  }
}
