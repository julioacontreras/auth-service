import { Auth } from './Auth'

export let auth: Auth

export function setAuth (newAuth: Auth) {
  auth = newAuth
}
