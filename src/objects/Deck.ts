import { Client } from "../Client";
import { Routes } from "../rest/routes/decks";
import { ICard, IUser } from "./interfaces";
import { DeckValidity, IDeck } from "./interfaces/IDeck";
import { Deck as DeckPayload, DeckDetails as DeckDetailsPayload, DeckValidity as DeckValidityPayload, UpdateDeck as UpdateDeckPayload } from "../rest/payloads/decks";
import { Card as CardPayload } from "../rest/payloads/cards";
import { Card } from "./Card";
import { IClient } from "../IClient";

export class Deck implements IDeck {
    private readonly _deckid: number;
    private readonly _name: string;
    private readonly _user: IUser;
    private localcards: ICard[] | null;
    private readonly _client: IClient;

    public static fromDeckDetailsPayload(payload: DeckDetailsPayload, client: IClient, user:IUser): Deck {
        return new Deck(payload.deckid, 
                        payload.name, 
                        client,
                        user);
    }

    constructor(deckid: number, name: string, client: IClient, user:IUser) {
        this._deckid = deckid;
        this._name = name;
        this._client = client;
        this._user = user;
        this.localcards = null;
    }

    public async getCards(): Promise<ICard[]> {
        if (this.localcards === null) {
            await this.fetch();
        }
        return this.localcards;
    }

    public setCards(cards: ICard[]): ICard[] {
        this.localcards = cards;
        return this.localcards;
    }

    public async commit(): Promise<DeckValidity> {
        let deck:DeckPayload ={cards:this.localcards.map(card => card.cardid)};
        const response:UpdateDeckPayload = await this._client.rest.put(Routes.User.deckCards(this._user.id, this._deckid), deck);
        return {
            isValid: response.deck_validity.isvalid,
            issues: response.deck_validity.issues
        };
    }

    public async reset(): Promise<void> {
        await this.fetch();
    }

    public async getValidity(): Promise<DeckValidity> {
        const response:DeckValidityPayload = await this._client.rest.get(Routes.User.deckValidity(this._user.id ,this._deckid));
        return {
            isValid: response.isvalid,
            issues: response.issues
        };
    }

    private async fetch(): Promise<void>{
        const response:CardPayload[] = await this._client.rest.get(Routes.User.deckCards(this._user.id, this._deckid));
        this.localcards = [];
        for (let i = 0; i < response.length; i++) {
            this.localcards.push(Card.fromCardPayload(response[i]));
        }
    }

    public get deckid(): number {
        return this._deckid;
    }

    public get name(): string {
        return this._name;
    }
}