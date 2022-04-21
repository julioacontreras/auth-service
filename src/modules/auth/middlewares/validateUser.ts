import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import { Credential } from '../types/credential';

import { logger } from '@core/services/logger';

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

export async function validateUser (req:Request, res:Response, next:NextFunction) {
    const credential = req.body as unknown as Credential;
    const response = schema.validate(credential);

    if (response.error) {
        logger.error('invalid credentials');
        res.status(500).json({ error: 'invalid credentials' });
        return;
    }

    next();
}
