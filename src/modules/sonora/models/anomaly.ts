import { Document, ObjectId } from 'mongodb';

import { database } from '@core/services/mongodb/connector';

import { AnomalyType } from '../types/anomaly';
import { AnomalySerializedType } from '../types/anomalySerialized';
import { useAnomalyHelper } from '../helpers/anomaly';

export function useAnomalyModel () {
    const Anomaly = database.collection('anomalies');
    const Box = database.collection('boxes');

    const {
        prepareAnomalyArray,
        prepareAnomaly
    } = useAnomalyHelper(Box);
    
    function create (anomaly: AnomalyType) {
        Anomaly.insertOne(anomaly as unknown as Document);
    }

    async function findById (_id: string): Promise<AnomalySerializedType> {
        const anomaly = await Anomaly.findOne({ '_id': new ObjectId(_id) });
        if (!anomaly) throw 'not-found-anomaly';
        return await prepareAnomaly(anomaly as unknown as AnomalySerializedType); 
    }

    async function findAll (): Promise<AnomalySerializedType[]> {
        const anomalies = await Anomaly.find().sort({ happenAt: -1 }).limit(30).toArray();
        return prepareAnomalyArray( anomalies as unknown as AnomalySerializedType[] );
    }

    return {
        create,
        findById,
        findAll
    };
}

