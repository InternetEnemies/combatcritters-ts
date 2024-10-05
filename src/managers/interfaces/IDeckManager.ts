import { IDeck } from "../../objects/interfaces";
import { DeckRules } from "../../rest/payloads";

export interface IDeckManager {
    getDecks(): Promise<IDeck[]>;
    addDeck(deckName: string): Promise<IDeck>;
    deleteDeck(deckID: number): Promise<void>;
    getDeckRules(): Promise<DeckRules>;
}