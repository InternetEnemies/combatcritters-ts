import { IClient } from "../IClient";
import { IDeck, IUser } from "../objects";
import { DeckRules } from "../rest/payloads";
import {IDeckManager} from "./interfaces";

export class DeckManager implements IDeckManager {
    private readonly _client: IClient;
    private readonly _user: IUser;

    constructor(client: IClient, user: IUser) {
        this._client = client;
        this._user = user;
    }

    getDecks(): Promise<IDeck[]> {
        throw new Error("Method not implemented.");
    }
    createDeck(deckName: string): Promise<IDeck> {
        throw new Error("Method not implemented.");
    }
    deleteDeck(deck: IDeck): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getDeckRules(): Promise<DeckRules> {
        throw new Error("Method not implemented.");
    }
}