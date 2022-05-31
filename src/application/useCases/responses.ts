import { statusHTTP } from '@/adapters/serverHTTP'

export const RESPONSE_UNAUTHORIZED = {
  response: {},
  code: statusHTTP.UNAUTHORIZED 
} 
  
export const RESPONSE_INTERNAL_SERVER_ERROR = {
  response: {},
  code: statusHTTP.INTERNAL_SERVER_ERROR 
} 
