import { MongoClient, Db } from 'mongodb'
import { logger } from '@/adapters/logger'

export let database: Db
export let client: MongoClient

export async function run (uri: string): Promise<void> {
  const databaseName = process.env.DATABASE_NAME
  if (!databaseName) throw 'Dont have database name'

  client = new MongoClient(uri)
  try {
    // Connect the client to the server
    await client.connect()
    logger.info('Connected successfully to server')
    database = client.db(databaseName)
  } catch(err) {
    // Ensures that the client will close when you finish/error
    await client.close()
    logger.error(err as string)
  }
}
