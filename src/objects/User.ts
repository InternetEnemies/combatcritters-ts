import {ICardsManager, IDeckManager, IUserCardsManager} from "../managers";
import {IUser} from "./interfaces";
import {UserPayload} from "../rest/payloads";
import {IClient} from "../IClient";
import {DeckManager} from "../managers/DeckManager";
import {UserCardsManager} from "../managers/UserCardsManager";

export class User implements IUser {
    private readonly _decks: IDeckManager;
    private readonly _cards: IUserCardsManager;
    private readonly _username: string;
    private readonly _id: number;
    private readonly client;
    
    static fromUserPayload(client:IClient,payload:UserPayload) {
        return new User(
            client,
            payload.username,
            payload.id
        )
    }
    
    constructor(client:IClient, username: string, id: number) {
        this.client = client;
        this._decks = new DeckManager();
        this._cards = new UserCardsManager(client, this);
        this._username = username;
        this._id = id;
    }
    
    
    public get decks() :IDeckManager {
        return this._decks;
    }
    public get cards():IUserCardsManager {
        return this._cards;
    }
    public get username():string {
        return this._username;
    }
    public get id():number {
        return this._id;
    }
}