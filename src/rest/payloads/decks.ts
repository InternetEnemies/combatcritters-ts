/**
 * decks.ts
 * @created 2024-10-29
 * @brief Payloads for the decks
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