import { Credential, FunctionReturnBoolean, ResponsePrepareRegister } from './types'

export interface Auth {
    login: (email: string, password: string, credential: Credential) => string
    useLogout: (exec: FunctionReturnBoolean) => FunctionReturnBoolean
    isAuthenticated: (tokenAccess: string) => Promise<boolean>
    createPassword: (passwordPlain: string, email: string) => Promise<ResponsePrepareRegister>
}
