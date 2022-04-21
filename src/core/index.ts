import { Express } from 'express';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';

import { loadJson } from '@core/helpers/loadJson';
import { useLogger } from '@core/services/logger';
import connector from '@core/services/mongodb/connector';
import { App } from '@/core/types/app';

async function useDatabase () {
    const uri = process.env.MONGO_CONNECTION;
    if(!uri) {
        throw 'Not exist url database connection.';
    }
    await connector.run(uri);
}

export async function useApp (server: Express): Promise<App> {   
    dotenv.config(); // load configuration .env

    server.use(bodyParser.urlencoded({ extended: false }));    
    server.use(bodyParser.json());

    const config = loadJson('@/../config.json');
    useLogger(config.logger);

    await useDatabase();

    return {
        server,
        config,
        port: config.port || 3000
    };
}
