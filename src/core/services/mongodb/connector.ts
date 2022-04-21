import { MongoClient, Db } from 'mongodb';
import { logger } from '@core/services/logger';

export let database: Db;
export let client: MongoClient;

async function run (uri: string): Promise<void> {
    client = new MongoClient(uri);
    try {
        // Connect the client to the server
        await client.connect();
        logger.info('Connected successfully to server');
        database = client.db('sonora');
    } catch(err) {
        // Ensures that the client will close when you finish/error
        await client.close();
        logger.error(err as string);
    }
}

export default { run };
