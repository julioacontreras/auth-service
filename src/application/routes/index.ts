import { serverHTTP } from '../../adapters/serverHTTP'

import { loginCaseUse } from '../../application/useCases/login'
import { registerCaseUse } from '../../application/useCases/register'
import { isAuthenticatedCaseUse } from '../../application/useCases/isAuthenticated'

export function useRoutes () {
  
  serverHTTP.add('signin', {
    useCase: loginCaseUse,
    route: '/api/auth/signin'
  })
  
  serverHTTP.add('signup', {
    useCase: registerCaseUse,
    route: '/api/auth/signup'
  })
  
  serverHTTP.add('isAuthenticated', {
    useCase: isAuthenticatedCaseUse,
    route: '/api/auth/is-authenticated'
  })
  
}
