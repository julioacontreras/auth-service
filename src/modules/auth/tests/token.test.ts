import { useToken } from '../services/token';

test('should token return valid ', async () => {
    const token = useToken('token-secret');
    const tokenAccess = token.generateAccessToken('julio');
    const restul = await token.verifyAccessToken(tokenAccess);
    expect(restul).toEqual(true);
});

test('should token return invalid ', async () => {
    const token = useToken('token-secret');
    const result = await token.verifyAccessToken('invalid-token');
    expect(result).toEqual(false);
});
