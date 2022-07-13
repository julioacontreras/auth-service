import { Auth } from '@/adapters/auth/Auth'
import { setAuth } from '@/adapters/auth'

import { useLogout } from './core/logout'
import { login } from './core/login'
import { isAuthenticated } from './core/isAuthenticated'
import { createPassword } from './core/createPassword'

const auth: Auth = {
  login,
  useLogout,
  isAuthenticated,
  createPassword
}

setAuth(auth)
