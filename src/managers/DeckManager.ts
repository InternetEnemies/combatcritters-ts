import {IDeckManager} from "./interfaces";
import {IDeck} from "../objects";
import { Deck, UserPayload } from "../rest/payloads";
import { IRest, Routes } from "../rest";

export class DeckManager implements IDeckManager {
    private readonly _user : UserPayload;
    private readonly rest: IRest;

    constructor(user:UserPayload, rest:IRest) {
        this._user = user;
        this.rest = rest;
    }
    
    public async getDeck(deckid: number): Promise<IDeck> {
        const userDeck:IDeck = await this.rest.get(Routes.Decks.User.deckCards(this._user.id, deckid));
        //TODO: need to translate the payload to the object
        return userDeck;
    }

    public async getDecks(): Promise<IDeck[]> {
        const userDecks:IDeck[] = await this.rest.get(Routes.Decks.User.decks(this._user.id));
        //TODO: need to translate the payload to the object
        return userDecks;
    }
}