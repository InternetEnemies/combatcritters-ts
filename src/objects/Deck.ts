import { Client } from "../Client";
import { Routes } from "../rest/routes/decks";
import { ICard, IUser } from "./interfaces";
import { DeckValidity, IDeck } from "./interfaces/IDeck";
import { Deck as DeckPayload, DeckDetails as DeckDetailsPayload, DeckValidity as DeckValidityPayload, UpdateDeck as UpdateDeckPayload } from "../rest/payloads/decks";
import { Card as CardPayload } from "../rest/payloads/cards";
import { Card } from "./Card";

export class Deck implements IDeck {
    private readonly _deckid: number;
    private readonly _name: string;
    private readonly _user: IUser;
    private localcards: ICard[];
    private readonly _client: Client;

    public static fromDeckDetailsPayload(payload: DeckDetailsPayload, client: Client, user:IUser): Deck {
        return new Deck(payload.deckid, 
                        payload.name, 
                        client,
                        user);
    }

    constructor(deckid: number, name: string, client: Client, user:IUser) {
        this._deckid = deckid;
        this._name = name;
        this._client = client;
        this._user = user;
        this.localcards = [];
    }

    public async getCards(): Promise<ICard[]> {
        
    }

    public async setCards(cards: ICard[]): Promise<DeckValidity> {
    
    }

    public async commit(): Promise<void> {
        
    }

    public async reset(): Promise<void> {
        
    }

    public async getValidity(): Promise<DeckValidity> {
        const response:DeckValidityPayload = await this._client.rest.get(Routes.User.deckValidity(this._user.id ,this._deckid));
        return {
            isValid: response.isvalid,
            issues: response.issues
        };
    }

    public get deckid(): number {
        return this._deckid;
    }

    public get name(): string {
        return this._name;
    }
}