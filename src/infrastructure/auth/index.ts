import { Auth } from '@/adapters/auth/Auth'
import { setAuth } from '@/adapters/auth'

import { useLogout } from './core/logout'
import { login } from './core/login'
import { isAuthenticated } from './core/isAuthenticated'
import { prepareToRegister } from './core/prepareToRegister'

const auth: Auth = {
  login,
  useLogout,
  isAuthenticated,
  prepareToRegister
}

setAuth(auth)
