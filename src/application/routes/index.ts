import { serverHTTP } from '@/adapters/serverHTTP'

import { loginCaseUse } from '../useCases/login'
import { logoutCaseUse } from '../useCases/logout'

export function useRoutes () {
   
  serverHTTP.add('login', {
    useCase: loginCaseUse,
    route: '/api/auth/login'
  })
    
  serverHTTP.add('logout', {
    useCase: logoutCaseUse,
    route: '/api/auth/logout'
  })
    
}
