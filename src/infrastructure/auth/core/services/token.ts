import jwt from 'jsonwebtoken'

export function useToken (tokenSecret: string) {

  function generateAccessToken (email: string) {
    return jwt.sign({ email }, tokenSecret, { expiresIn: '1d' })
  }

  function verifyAccessToken (tokenAccess: string): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(tokenAccess, tokenSecret, (err: unknown) => {
        resolve(!err ? true : false)
      })
    })    
  }

  return {
    generateAccessToken,
    verifyAccessToken
  }
}
