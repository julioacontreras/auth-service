import { UserSchema } from './schemas/UserSchema'

export interface Database {
    models: {
        User: () => {
            findByEmail: (email: string) => Promise<UserSchema>
        }
    }
}
