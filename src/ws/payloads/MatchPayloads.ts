import {OfferItem} from "../../rest/payloads";

/**
 * Event for when a game is found, contains the name of the opponent
 */
export type GameFoundEvent = {
    "opponent": string
}

export type MatchCommand = {
    "type": string,
    "deckid": number
}

export type CancelMatchCommand = {}
export type MatchEndedEvent = {
    "type":string,
    "rewards":OfferItem[]
}