import dotenv from 'dotenv'
dotenv.config()

import '@/infrastructure/logger'
import '@/infrastructure/auth'
import '@/infrastructure/serverHttpFastify'
import '@/infrastructure/databaseMongodb'

import { startApp } from  '@/application'

startApp()
