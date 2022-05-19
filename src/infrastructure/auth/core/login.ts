import { Credential } from '@/adapters/auth/types'
import { useSecurity } from './services/security'
import { useToken } from './services/token'

export function login (email: string, passwordPlain: string, credential: Credential): string {
  const secretToken = process.env.TOKEN_SECRET

  if (!secretToken) {
    throw 'Dont have secret token'
  }

  if ( credential.email !== email ) {
    throw 'Invalid e-mail'
  }

  const { verifyHash } = useSecurity()

  if (verifyHash(passwordPlain + credential.salt, credential.password)) {
    const { generateAccessToken } = useToken(secretToken)
    return generateAccessToken(email)
  }

  throw 'Invalid passsword'
}
