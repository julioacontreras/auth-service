import { ObjectId, Collection, Document } from 'mongodb';

import { BoxType } from '../types/box';
import { AnomalyType } from '../types/anomaly';
import { AnomalySerializedType } from '../types/anomalySerialized';

export function useAnomalyHelper (Box: Collection<Document>) {

    const prepareAnomalyArray = async (collection: AnomalyType[]): Promise<AnomalySerializedType[]> => {
        const result: AnomalySerializedType[] = [];
        for (let i=0; i<collection.length; i++) {
            result.push(await prepareAnomaly(collection[i]));
        }
        return result;
    };
    
    const prepareAnomaly = async (anomaly: AnomalyType): Promise<AnomalySerializedType> => {
        const boxData = await Box.findOne({ _id: new ObjectId(anomaly.boxId) });
        const box = boxData as unknown as BoxType;
        return {
            _id: anomaly._id,
            filepath: anomaly.filepath,
            happenAt: anomaly.happenAt,
            status: anomaly.status,
            boxId: box?._id || '',
            boxName: box?.name || ''
        };
    };

    return {
        prepareAnomalyArray,
        prepareAnomaly
    };
}
