import { App } from '@core/types/app';

import { useRoutes } from './routes';

function run (app: App) {
    if (!process.env.TOKEN_SECRET) {
        throw 'ERROR: Dont have token in enviroments';
    }

    useRoutes(app);
}

export default { run };
