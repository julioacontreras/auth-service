import { setLogger } from '@/adapters/logger'

const logger = {
  info (message: string) {
    console.log(message)
  },
  error (message: string) {
    console.error(message)
  }
}

setLogger(logger)
