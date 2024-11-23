import {ICard} from "./ICard";
import {IDeckValidity} from "./IDeckValidity";

/**
 * IDeckValidator.ts
 * @created 2024-10-29
 * @brief DeckValidator interface & DeckIssues enum
 */
export interface IDeckValidator {
    /**
     * Validate a deck locally.
     * @param cards the deck to validate
     * @returns IDeckValidity the validity of the deck
     */
    validate(cards: ICard[]): Promise<IDeckValidity>;

    /**
     * refreshes the local cards in the validator
     */
    refresh():void;
}

export enum DeckIssues {
    STR_MIN_CARDS = "Deck must have at least %d cards (deck has %d cards)",
    STR_MAX_CARDS = "Deck cannot have more than %d cards (deck has %d cards)",
    STR_LIMIT_LEGEND = "Deck cannot have more than %d Legendary cards (deck has %d)",
    STR_LIMIT_EPIC = "Deck cannot have more than %d Epic cards (deck has %d)",
    STR_LIMIT_RARE = "Deck cannot have more than %d Rare cards (deck has %d)",
    STR_LIMIT_ITEM = "Deck cannot have more than %d Item cards (deck has %d)",
    STR_OWNED = "You own %d %s cards. (Deck uses %d)"
}