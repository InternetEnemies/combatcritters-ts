import {IDeckManager} from "./interfaces";
import {IDeck} from "../objects";

export class DeckManager implements IDeckManager {
    decks: IDeck[];

    getDeck(deckid: number): Promise<IDeck> {
        return Promise.resolve(undefined);
    }

    getDecks(): Promise<IDeck[]> {
        return Promise.resolve([]);
    }
    //todo
}