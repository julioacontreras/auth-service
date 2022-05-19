// https://jwt.io/

import jwt from 'jsonwebtoken'

type DecodedMessage = {
  email: string;
  iat: string;
  exp: string;
}

export function useToken (tokenSecret: string) {
  /**
   *  Generate access token with the user email
   * 
   * @param email 
   * @returns string access token
   */
  function generateAccessToken (email: string) {
    return jwt.sign({ email }, tokenSecret, { expiresIn: '1d' })
  }

  /**
   *  Verify access token with the user email
   * 
   * @param tokenAccess 
   * @param email 
   * @returns string access token
   */
  function verifyAccessToken (tokenAccess: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        jwt.verify(tokenAccess, tokenSecret) as unknown as DecodedMessage
        resolve(true)
      } catch (err) {
        resolve(false)
      }
    })    
  }

  return {
    generateAccessToken,
    verifyAccessToken
  }
}
