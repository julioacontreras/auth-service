import crypto from 'crypto'

export function useSecurity () {

  /**
   * Generate salt key. 
   * 
   * Salt Salts are used to safeguard passwords in storage. Historically, only a cryptographic hash function 
   * of the password was stored on a system, but over time, additional safeguards were developed to protect 
   * against duplicate or common passwords being identifiable (as their hashes are identical). Salting is one such protection
   * 
   * @returns string salt
   */
  function generateSalt () {
    return crypto.randomBytes(64).toString('hex')
  }

  /**
   * Generate hash 
   * 
   * @returns string hash
   */
  function generateHash (value: string) {
    return crypto.createHash('md5').update(value).digest('hex')
  }

  /**
   * Verify plain password with password hash
   * 
   * @returns boolean is successfully
   */
  function verifyHash (value: string, hash: string): boolean {
    const hastToTest = generateHash(value)
    return hastToTest === hash
  }

  return {
    generateSalt,
    generateHash,
    verifyHash
  }
}
