import { UserSchema } from '@/adapters/database/schemas/UserSchema'

import { database } from '../connector'

export function useUserModel () {
  const User = database.collection('users')

  async function findByEmail (email: string): Promise<UserSchema> {
    return await User.findOne({ email }) as unknown as UserSchema
  }

  return {
    findByEmail
  }
}

