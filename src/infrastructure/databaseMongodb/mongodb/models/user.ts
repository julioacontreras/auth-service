import { database } from '../connector'

export function useUserModel () {
  const User = database.collection('users')

  async function findByEmail <T> (email: string): Promise<T> {
    return await User.findOne({ email }) as unknown as T
  }

  type ResponseRegister = { id: string }

  async function register <T> (user: T): Promise<{ id:string }> {
    try {
      const userSaved = await User.insertOne(user) as unknown as T
      const userSavedResponse = userSaved as unknown as ResponseRegister
      return { id: userSavedResponse.id }
    } catch (err) {
      return { id: '' }
    }
  }

  return {
    findByEmail,
    register
  }
}

