import { UserPartyEntity } from './UserPartyEntity'

export type EventEntity = {
    id?: string
    name: string
    address: string
    city: string
    expireAt: string
    createAt: string
    people: [ UserPartyEntity ]
    status: string
}
