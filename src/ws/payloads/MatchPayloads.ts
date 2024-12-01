/**
 * Event for when a game is found, contains the name of the opponent
 */
export type GameFoundEvent = {
    "opponent": string
}

export type MatchCommand = {
    "type": string
}

export type CancelMatchCommand = {}