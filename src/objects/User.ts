import {ICardsManager, IDeckManager, IUserCardsManager} from "../managers";
import {IUser} from "./interfaces";
import {UserPayload} from "../rest/payloads";
import {IClient} from "../IClient";
import {DeckManager} from "../managers/DeckManager";
import {UserCardsManager} from "../managers/UserCardsManager";

export class User implements IUser {
    private readonly _decks: IDeckManager;
    private readonly _cards: IUserCardsManager;
    private readonly _userid:number;
    private readonly _username:string;
    private readonly client;
    
    static fromUserPayload(client:IClient,payload:UserPayload) {
        return new User(
            client,
            new DeckManager(),
            new UserCardsManager(),
            payload.id,
            payload.username
        )
    }
    
    constructor(client:IClient, decks: IDeckManager, cards: IUserCardsManager, userid:number, username:string) {
        this.client = client;
        this._decks = decks;
        this._cards = cards;
        this._userid = userid;
        this._username = username;
    }
    
    
    public get decks() :IDeckManager {
        return this._decks;
    }
    public get cards():ICardsManager {
        return this._cards;
    }
    public get userid():number {
        return this._userid;
    }
    public get username():string {
        return this._username;
    }
}