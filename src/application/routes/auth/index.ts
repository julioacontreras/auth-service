import { serverHTTP } from '@/adapters/serverHTTP'

import { signinCaseUse } from '@/application/useCases/signin'
import { logoutCaseUse } from '@/application/useCases/logout'
import { registerCaseUse } from '@/application/useCases/register'
import { isAuthenticatedCaseUse } from '@/application/useCases/isAuthenticated'
import { resetPasswordCaseUse } from '@/application/useCases/resetPassword'


export function useRoutesAuth () {
   
  serverHTTP.add('signin', {
    useCase: signinCaseUse,
    route: '/api/auth/signin'
  })
    
  serverHTTP.add('register', {
    useCase: registerCaseUse,
    route: '/api/auth/register'
  })

  serverHTTP.add('isAuthenticated', {
    useCase: isAuthenticatedCaseUse,
    route: '/api/auth/is-authenticated'
  })
  
  serverHTTP.add('resetPassword', {
    useCase: resetPasswordCaseUse,
    route: '/api/auth/reset-password'
  })  
}
