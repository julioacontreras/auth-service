import { FastifyInstance } from 'fastify'

import { UseCaseRoute, UseCaseMap } from '@/adapters/serverHTTP/types'

export function createUseCases (useCases: UseCaseMap, server: FastifyInstance) {
  useCases.forEach((value, key) => {
    const useCaseRoute = value as unknown as UseCaseRoute
    
    server.post(useCaseRoute.route, {}, async (request) => {
      const useCaseExecute = useCases.get(key)?.useCase

      if (!useCaseExecute) {
        throw `Not exist use case ${key}`
      }

      return await useCaseExecute({ params: request.body })
    })
  })
}
