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
        const response:CardPayload[] = await this._client.rest.get(Routes.User.deckCards(this._user.id, this._deckid));
        let cards: ICard[] = [];
        for (let i = 0; i < response.length; i++) {
            cards.push(Card.fromCardPayload(response[i]));
        }
        if(this.localcards.length == 0){
            this.localcards = cards;
        }
        return cards;
    }

    public setCards(cards: ICard[]): ICard[] {
        this.localcards = cards;
        return this.localcards;
    }

    public async commit(): Promise<DeckValidity> {
        const response:UpdateDeckPayload = await this._client.rest.put(Routes.User.deckCards(this._user.id, this._deckid), this.localcards.map(card => card.cardid));
        return {
            isValid: response.deck_validity.isvalid,
            issues: response.deck_validity.issues
        };
    }

    public async reset(): Promise<void> {
        this.localcards = [];
        await this.getCards();
    }

    public async getValidity(): Promise<DeckValidity> {
        const response:DeckValidityPayload = await this._client.rest.get(Routes.User.deckValidity(this._user.id ,this._deckid));
        return {
            isValid: response.isvalid,
            issues: response.issues
        };
    }

    public getLocalCards(): ICard[] {
        return this.localcards;
    }

    public getDeckId(): number {
        return this._deckid;
    }

    public getName(): string {
        return this._name;
    }
}