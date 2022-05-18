import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { UseCaseMap } from '@/adapters/serverHTTP/types'

import { createUseCases } from './createUseCases'

export function startServer (useCases: UseCaseMap): void {   
  const server = Express()
  server.use(bodyParser.urlencoded({ extended: false }))   
  server.use(bodyParser.json())
  server.use(cors)

  createUseCases(useCases, server)

  const port = 4000
  server.listen(port, () => {
    console.info(`Runnning application in HTTP mode on port ${port}. 🔥`)
  })
}
