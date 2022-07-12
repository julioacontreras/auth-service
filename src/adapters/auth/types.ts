export type Credential = {
    email: string;
    password: string;
    salt: string;
    enabled?: string;
}

export type FunctionReturnBoolean = () => boolean

export type FunctionEmailExist = (email: string) => Promise<boolean>

export type ResponsePrepareRegister = {
    salt: string;
    password: string;
    accessToken: string;
}
