import { Request, Response } from 'express';

import { createAccessToken } from './service';
import { Credential } from '../../types/credential';

export async function login (req:Request, res:Response) {
    const credential = req.body as unknown as Credential;

    const token = await createAccessToken(credential);

    res.status(200).json({ token: token });
}
