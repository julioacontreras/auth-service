import crypto from 'crypto'

export function useSecurity () {

  function generateSalt () {
    return crypto.randomBytes(64).toString('hex')
  }

  function generateHash (value: string) {
    return crypto.createHash('md5').update(value).digest('hex')
  }

  function verifyHash (value: string, hash: string): boolean {
    const hastToTest = generateHash(value)
    return hastToTest === hash
  }

  return {
    generateHash,
    verifyHash,
    generateSalt
  }
}
