import { FunctionReturnBoolean } from '../../../adapters/auth/types'

export function useLogout (exec: FunctionReturnBoolean) {
  return function logout (): boolean {
    return exec()
  } 
}

