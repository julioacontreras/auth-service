import jwt from 'jsonwebtoken';

export function useToken (tokenSecret: string) {

    function generateAccessToken (username: string) {
        return jwt.sign({ username }, tokenSecret, { expiresIn: '1d' });
    }

    function verifyAccessToken (tokenAccess: string): Promise<boolean> {
        return new Promise((resolve) => {
            jwt.verify(tokenAccess, tokenSecret, (err: unknown) => {
                resolve(!err ? true : false);
            });
        });    
    }

    return {
        generateAccessToken,
        verifyAccessToken
    };
}
