import { IDeck } from "../../objects/interfaces";
import { DeckRules } from "../../rest/payloads";

export interface IDeckManager {
    getDecks(): Promise<IDeck[]>;
    createDeck(deckName: string): Promise<IDeck>;
    deleteDeck(deck: IDeck): Promise<void>;
    getDeckRules(): Promise<DeckRules>;
}