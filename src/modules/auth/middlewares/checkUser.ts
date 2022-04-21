import { Request, Response, NextFunction } from 'express';

import { logger } from '@core/services/logger';

import { Credential } from '../types/credential';
import { useUserModel } from '../models/user';
import { useSecurity } from '../services/security';

export async function checkUser (req:Request, res:Response, next:NextFunction ) {
    const credential = req.body as unknown as Credential;
    const User = useUserModel();

    const user = await User.findByUsername(credential.username);
    if (!user) {
        logger.info('checkUser: User no exist');
        res.status(401).json({});
        return;
    }

    const { verifyHash } = useSecurity();
    if (!verifyHash(credential.password + user.salt, user.password)) {
        logger.info('checkUser: No match password');
        res.status(401).json({});
        return;
    }

    next();
}
