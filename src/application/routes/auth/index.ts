import { serverHTTP } from '@/adapters/serverHTTP'

import { loginCaseUse } from '@/application/useCases/login'
import { logoutCaseUse } from '@/application/useCases/logout'
import { registerCaseUse } from '@/application/useCases/register'
import { isAuthenticatedCaseUse } from '@/application/useCases/isAuthenticated'

export function useRoutesAuth () {
   
  serverHTTP.add('login', {
    useCase: loginCaseUse,
    route: '/api/auth/login'
  })
    
  serverHTTP.add('logout', {
    useCase: logoutCaseUse,
    route: '/api/auth/logout'
  })

  serverHTTP.add('register', {
    useCase: registerCaseUse,
    route: '/api/auth/register'
  })

  serverHTTP.add('isAuthenticated', {
    useCase: isAuthenticatedCaseUse,
    route: '/api/auth/is-authenticated'
  })
  
}
