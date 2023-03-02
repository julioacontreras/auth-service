import { Database } from '../../adapters/database/Database'
import { setDatabase } from '../../adapters/database'

import { run } from './mongodb/connector'
import { useUserModel } from './mongodb/models/user'

async function useDatabase (): Promise<Database> {
  const urlConnection = process.env.AUTH_SERVICE_MONGO_CONNECTION 

  if (!urlConnection) {
    throw 'Not exist url connection to mongoDB'
  }

  await run(urlConnection)

  return {
    models: {
      User () {
        const model = useUserModel()
        return {
          findByEmail: model.findByEmail,
          register: model.register
        }
      } 
    }
  }
}

async function start () {
  setDatabase(await useDatabase())
}

start()
