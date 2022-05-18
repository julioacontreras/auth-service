import { Database } from './Database'

export let database: Database

export function setDatabase (newDatabase: Database): void{
  database = newDatabase
}
