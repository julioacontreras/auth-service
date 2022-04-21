import { App } from '@core/types/app';

import { getAnomalies, getAnomaly, downloadAnomaly } from '../components/anomaly/controller';
import { isAuthenticated } from '@modules/auth/middlewares/isAuthenticated';

export function useRoutes (app: App) {

    app.server.get('/api/sonora/anomalies', isAuthenticated, getAnomalies);

    app.server.get('/api/sonora/anomaly/info/:id', isAuthenticated, getAnomaly);

    app.server.get('/api/sonora/anomaly/file/:id', downloadAnomaly);
}
