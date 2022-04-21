import { Credential } from '../../types/credential';

import { useToken } from '../../services/token';

export function createAccessToken (credential: Credential): string {
    const tokenSecret: string = process.env.TOKEN_SECRET || '';
    const {
        generateAccessToken
    } = useToken(tokenSecret);
    const tokenAccess = generateAccessToken(credential.username);

    return tokenAccess;
}
