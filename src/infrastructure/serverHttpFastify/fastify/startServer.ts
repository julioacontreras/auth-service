import fastify from 'fastify'
import cors from '@fastify/cors'

import { UseCaseMap } from '@/adapters/serverHTTP/types'

import { createUseCases } from './createUseCases'

export function startServer (useCases: UseCaseMap): void {  
  const port = process.env.PORT
  if (!port) {
    throw 'Dont have port selected in server'
  }
  const server = fastify()
  server.register(cors)  

  createUseCases(useCases, server)

  server.listen(port, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
