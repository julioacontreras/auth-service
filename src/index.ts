import express from 'express';

import { useApp } from './core/index';
import { logger } from './core/services/logger';

import authModule from './modules/auth/index';
import authSonora from './modules/sonora/index';

(async () => {

    const server = express();
    server.use(express.json());
    
    // start application
    const app = await useApp(server);
    const port = app.port || 3000;
    
    // start modules
    authModule.run(app);
    authSonora.run(app);
    
    server.listen(port, () => {
        logger.info(`Runnning application in ${process.env.NODE_ENV} mode on port ${port}. 🔥`);
    });
    
})().catch(e => {
    console.error(e);
});
