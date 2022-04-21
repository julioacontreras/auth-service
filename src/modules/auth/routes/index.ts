import { App } from '@core/types/app';

import { login } from '../components/login/controller';
import { checkUser } from '../middlewares/checkUser';
import { validateUser } from '../middlewares/validateUser';

export function useRoutes (app: App) {
    const middlewaresLogin = [validateUser, checkUser];

    /**
     * @api {get} /api/auth/login Check user credentials to enter in the application
     * @apiName GetLogin
     * @apiGroup Auth
     *
     * @apiBody {String} username User name.
     * @apiBody {String} password Password.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {}
     *
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 401 Unauthorized
     *     {}
     * 
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 500 Internal error
     *     { "error": "invalid data" }
     */    
    app.server.post('/api/auth/login', middlewaresLogin, login);
}
