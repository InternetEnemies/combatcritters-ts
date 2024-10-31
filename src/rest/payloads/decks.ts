/**
 * Payloads for the decks
 */
export type DeckDetails = {
    deckid: number,
    name: string
}

export type Deck = {
    cards: number[]
}

export type DeckValidity = {
    isvalid:boolean,
    issues: string[]
}

export type DeckRules = {
    min_cards: number,
    max_cards: number,
    limit_legend: number,
    limit_epic: number,
    limit_rare: number,
    limit_item: number
}

export type UpdateDeck = {
    deck: Deck
    deck_validity: DeckValidity
}

export enum DeckIssue {
    STR_MIN_CARDS = "Not enough cards in the deck",
    STR_MAX_CARDS = "Too many cards in the deck",
    STR_LIMIT_LEGEND = "Too many legendary cards in the deck",
    STR_LIMIT_EPIC = "Too many epic cards in the deck",
    STR_LIMIT_RARE = "Too many rare cards in the deck",
    STR_LIMIT_ITEM = "Too many items in the deck",
    STR_OWNED = "You own %d %s cards. (Deck uses %d)"
}