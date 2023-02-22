export type Credential = {
    _id?: string;
    email: string;
    password: string;
    salt: string;
}

export type FunctionReturnBoolean = () => boolean

export type FunctionEmailExist = (email: string) => Promise<boolean>

export type ResponsePrepareRegister = {
    salt: string;
    password: string;
    accessToken: string;
}
