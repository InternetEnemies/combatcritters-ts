import { IDeck } from "../../objects/interfaces";
import { DeckRules } from "../../rest/payloads";

export interface IUserManager {
    getDecks(): Promise<IDeck[]>;
    addDeck(deckName: string): Promise<IDeck>;
    deleteDeck(deckID: number): Promise<void>;
    getDeckRules(): Promise<DeckRules>;
}