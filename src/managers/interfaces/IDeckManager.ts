
import { DeckRules } from "../../rest/payloads";
import {IDeck, IDeckValidator} from "../../objects";

export interface IDeckManager {
    validator: IDeckValidator;
    /**
     * Get the decks of the user
     * @returns Promise<IDeck[]> the decks of the user
     */
    getDecks(): Promise<IDeck[]>;
    /**
     * Create a deck
     * @param deckName the name of the deck to create
     * @returns Promise<IDeck> the created deck
     */
    createDeck(deckName: string): Promise<IDeck>;
    /**
     * Delete a deck
     * @param deck the deck to delete
     */
    deleteDeck(deck: IDeck): Promise<void>;
    /**
     * Get the rules for a deck
     * @returns Promise<DeckRules> the rules for the deck
     */
    getDeckRules(): Promise<DeckRules>;
}