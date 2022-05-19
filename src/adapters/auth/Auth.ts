import { Credential, FunctionReturnBoolean, FunctionEmailExist, ResponsePrepareRegister } from './types'

export interface Auth {
    login: (email: string, password: string, credential: Credential) => string
    useLogout: (exec: FunctionReturnBoolean) => FunctionReturnBoolean
    isAuthenticated: (tokenAccess: string) => Promise<boolean>
    prepareToRegister: (credential: Credential, thisEmailExistis: FunctionEmailExist) => Promise<ResponsePrepareRegister>
}
