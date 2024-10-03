import { Client } from "../Client";
import { Rest } from "../rest";
import { Routes } from "../rest/routes/decks";
import { ICard } from "./interfaces";
import { DeckValidity, IDeck } from "./interfaces/IDeck";
import { Deck as DeckPayload, DeckDetails } from "../rest/payloads/decks";

export class Deck implements IDeck {
    private _deckid: number;
    private _name: string;
    private _cards: ICard[];
    private readonly _client: Client;

    public static fromDeckPayload(detailsPayload:DeckDetails , deckPayload: DeckPayload, client: Client): Deck {
        return new Deck(
            detailsPayload.deckid,
            detailsPayload.name,
            deckPayload.cards, 
            client
        );
    }

    constructor(deckid: number, name: string, cards: ICard[], client: Client) {
        this._deckid = Object.freeze(deckid);
        this._name = Object.freeze(name);
        this._cards = cards;
        this._client = client;
    }

    public async addCard(card: ICard, position: number): Promise<DeckValidity> {
        var temp_cards = this._cards;
        temp_cards.splice(position, 0, card);
        const response = await this._client.rest.put(Routes.User.deckCards(this._client.user.userid ,this._deckid), { cards: temp_cards });
        this._cards = Object.freeze(response.data.deck);
        return response.data.validity;
    }
    
    public async removeCard(position: number): Promise<DeckValidity> {
        var temp_cards = this._cards;
        temp_cards.splice(position, 1);
        const response = await this._client.rest.put(Routes.User.deckCards(this._client.user.userid ,this._deckid), { cards: temp_cards });
        this._cards = Object.freeze(response.data.deck);
        return response.data.validity;
    }

    public async delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async getValidity(): Promise<DeckValidity> {
        throw new Error("Method not implemented.");
    }

    public get deckid(): number {
        return this._deckid;
    }

    public get name(): string {
        return this._name;
    }

    public get cards(): ICard[] {
        return this._cards;
    }
}