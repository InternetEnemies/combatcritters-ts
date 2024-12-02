import {Payloads} from "../../rest"

export type PlayerTurnEvent = {
    is_turn:boolean
}

export type HealthEvent = {
    health:number,
    is_player:boolean
}

export type EnergyEvent = {
    energy:number,
    is_player:boolean
}

export type HandEvent = {
    cards:Payloads.Card[]
}

export type DrawPileEvent = {
    size:number
}

export type BoardStateEvent = {
    slots:CardStatePayload[],
    type:string
}

export type CardStatePayload = {
    card:Payloads.Card,
    health:number
}

export type EndTurnCommand = {}
export type PlayCardCommand = {
    id:number,
    pos:number
}
export type SacrificeCommand = {
    pos:number
}