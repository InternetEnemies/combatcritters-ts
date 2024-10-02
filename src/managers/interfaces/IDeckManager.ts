import {IDeck} from "../../objects";

export interface IDeckManager {
    /**
     * get the decks for the user
     */
    getDecks(): Promise<IDeck[]>;

    /**
     * get the deck with the given id
     * @param deckid id of the deck to get
     */
    getDeck(deckid:number):Promise<IDeck>;
}