import {IDeckManager, IUserCardsManager} from "../managers";
import {IUser} from "./interfaces";
import {UserPayload} from "../rest/payloads";
import {IClient} from "../IClient";
import {DeckManager} from "../managers/DeckManager";
import {UserCardsManager} from "../managers/UserCardsManager";

export class User implements IUser {
    private readonly _decks: IDeckManager;
    private readonly _cards: IUserCardsManager;
    private readonly client;
    
    static fromUserPayload(client:IClient,payload:UserPayload) {
        return new User(
            client,
            new DeckManager(),
            new UserCardsManager(payload, client.rest)
        )
    }
    
    constructor(client:IClient, decks: IDeckManager, cards: IUserCardsManager) {
        this.client = client;
        this._decks = decks;
        this._cards = cards;
    }
    
    public get decks() :IDeckManager {
        return this._decks;
    }

    public get cards():IUserCardsManager {
        return this._cards;
    }
}