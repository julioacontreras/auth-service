import { useSecurity } from '../../../../src/infrastructure/auth/core/services/security'

test('should generate two diffrents values ', async () => {
  const  { generateSalt } = useSecurity()
  const s1 = generateSalt()
  const s2 = generateSalt()
  expect(s1 !== s2).toEqual(true)
})

test('should generate same hash ', async () => {
  const  { generateHash } = useSecurity()
  const v1 = generateHash('asd')
  const v2 = generateHash('asd')
  expect(v1).toEqual(v2)
})

test('should generate verify valid hash ', async () => {
  const  { generateHash, verifyHash } = useSecurity()
  const hash = generateHash('asd')
  expect(verifyHash('asd', hash)).toEqual(true)
})

test('should generate verify invalid hash ', async () => {
  const  { generateHash, verifyHash } = useSecurity()
  const hash = generateHash('asd')
  expect(verifyHash('ass', hash)).toEqual(false)
})
