export type Credential = {
    email: string;
    password: string;
    salt: string;
}

export type FunctionReturnBoolean = () => boolean

export type FunctionEmailExist = (email: string) => boolean
