import { useToken } from './services/token'

export async function isAuthenticated (tokenAccess: string): Promise<boolean> {
  const secretToken = process.env.TOKEN_SECRET
  if (!secretToken) throw 'Dont have secret token'

  const { verifyAccessToken } = useToken(secretToken)

  return await verifyAccessToken(tokenAccess)
}

