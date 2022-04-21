import { Request, Response } from 'express';

import { logger } from '@core/services/logger';

import { useAnomalyModel } from '../../models/anomaly';

export async function getAnomalies (req:Request, res:Response) {
    const { findAll } = useAnomalyModel();

    const items = await findAll();
    const result = {
        page: 1,
        items: items,
        total: items.length || 0
    };
   
    res.status(200).json(result);
}

export async function getAnomaly (req:Request, res:Response) {
    const { findById } = useAnomalyModel();

    if (req.body) {
        const anomaly = await findById(req.body.id);
        return res.status(200).json(anomaly);
    }
    
    res.status(500).json({ error: 'not found anomaly' });
}

export async function downloadAnomaly (req:Request, res:Response) {
    const path = '../content/anomalies/audio.mp3'; 
    res.download(path, 'audio.mp3');
}

