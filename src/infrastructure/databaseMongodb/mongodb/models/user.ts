import { UserSchema } from '@/adapters/database/schemas/UserSchema'

import { database } from '../connector'

export function useUserModel () {
  const User = database.collection('users')

  async function findByEmail (email: string): Promise<UserSchema> {
    return await User.findOne({ email }) as unknown as UserSchema
  }

  async function register (user: UserSchema): Promise<{ id:string }> {
    try {
      const userSaved = await User.insertOne(user) as unknown as UserSchema
      return {
        id: userSaved?.id || ''
      }

    } catch (err) {
      return {
        id: ''
      }
    }
  }

  return {
    findByEmail,
    register
  }
}

