import { ServerHTTP } from './ServerHTTP'

export let serverHTTP: ServerHTTP

export function setServerHTTP (newServer: ServerHTTP) {
  serverHTTP = newServer
}
