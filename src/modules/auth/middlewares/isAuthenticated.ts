import { Request, Response, NextFunction } from 'express';

import { logger } from '@core/services/logger';

import { useToken } from '../services/token';

export async function isAuthenticated (req:Request, res:Response, next:NextFunction) {
    if (!process.env.TOKEN_SECRET) {
        logger.error('Dont have token secret');        
        return res.sendStatus(500);
    }

    const { verifyAccessToken } = useToken(process.env.TOKEN_SECRET);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        logger.error('Token null');        
        return res.sendStatus(401);
    }

    const isValid = await verifyAccessToken(token);
    if (isValid) { 
        return next();
    }

    return res.sendStatus(401);    
}
