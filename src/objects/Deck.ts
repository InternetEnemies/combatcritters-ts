import { Client } from "../Client";
import { Routes } from "../rest/routes/decks";
import { ICard, IUser } from "./interfaces";
import { DeckValidity, IDeck } from "./interfaces/IDeck";
import { Deck as DeckPayload, DeckDetails as DeckDetailsPayload, DeckValidity as DeckValidityPayload } from "../rest/payloads/decks";
import { Card as CardPayload } from "../rest/payloads/cards";
import { Card } from "./Card";

export class Deck implements IDeck {
    private readonly _deckid: number;
    private _name: string;
    private readonly _user: IUser;
    private _cards!: number[];
    private readonly _client: Client;

    public static fromDeckDetailsPayload(payload: DeckDetailsPayload, client: Client, user:IUser): Deck {
        return new Deck(payload.deckid, 
                        payload.name, 
                        client,
                        user);
    }

    constructor(deckid: number, name: string, client: Client, user:IUser) {
        this._deckid = deckid;
        this._name = Object.freeze(name);
        this._client = client;
        this._user = user;
    }

    public async getCards(): Promise<ICard[]> {
        const response:CardPayload[] = await this._client.rest.get(Routes.User.deckCards(this._user.userid ,this._deckid));
        let cardsObj: ICard[] = [];
        response.forEach((card) => {
            cardsObj.push(Card.fromCardPayload(card));
        });
        return cardsObj;
    }

    public async addCard(card: ICard, position: number): Promise<DeckValidity> {

    }
    
    public async removeCard(position: number): Promise<DeckValidity> {
        var temp_cards = this._cards;
        temp_cards.splice(position, 1);
        const response = await this._client.rest.put(Routes.User.deckCards(this._client.user.userid ,this._deckid), { cards: temp_cards });
        this._cards = Object.freeze(response.data.deck);
        return response.data.validity;
    }

    public async setCards(cards: ICard[]): Promise<DeckValidity> {
        const response = await this._client.rest.put(Routes.User.deckCards(this._client.user.userid ,this._deckid), { cards });
        this._cards = Object.freeze(response.data.deck);
        return response.data.validity;
    }

    public async getValidity(): Promise<DeckValidity> {
        const response:DeckValidityPayload = await this._client.rest.get(Routes.User.deckValidity(this._user.userid ,this._deckid));
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