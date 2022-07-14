import { statusHTTP } from '@/adapters/serverHTTP'

export const RESPONSE_UNAUTHORIZED = {
  response: {
    url: '/response/unauthorized'
  },
  code: statusHTTP.UNAUTHORIZED 
} 
  
export const RESPONSE_INTERNAL_SERVER_ERROR = {
  response: {
    url: '/response/internal-error'
  },
  code: statusHTTP.INTERNAL_SERVER_ERROR 
} 

export const RESPONSE_NO_PASSWORD = {
  response: {
    url: '/response/check-your-email'
  },
  code: statusHTTP.OK
}

export const RESPONSE_WAIT_LIST = {
  response: {
    url: '/response/wait-list'
  },
  code: statusHTTP.OK
}  
