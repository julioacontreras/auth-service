import { UserPartySchema } from './UserPartySchema'

export type EventSchema = {
    id?: string
    name: string
    address: string
    city: string
    expireAt: string
    createAt: string
    people: [ UserPartySchema ]
    status: string
}
