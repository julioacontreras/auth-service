import { UserPartyType } from './UserParty'

export type EventType = {
    id?: string
    name: string
    address: string
    city: string
    expireAt: string
    createAt: string
    people: [ UserPartyType ]
    status: string
}
