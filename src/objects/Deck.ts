import { Client } from "../Client";
import { Routes } from "../rest/routes/decks";
import { ICard, IUser } from "./interfaces";
import { DeckValidity, IDeck } from "./interfaces/IDeck";
import { Deck as DeckPayload, DeckDetails as DeckDetailsPayload, DeckValidity as DeckValidityPayload, UpdateDeck as UpdateDeckPayload } from "../rest/payloads/decks";
import { Card as CardPayload } from "../rest/payloads/cards";
import { Card } from "./Card";

export class Deck implements IDeck {
    private readonly _deckid: number;
    private _name: string;
    private readonly _user: IUser;
    private _cards: ICard[];
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
        this._cards = [];
    }

    public async getCards(): Promise<ICard[]> {
        const response:CardPayload[] = await this._client.rest.get(Routes.User.deckCards(this._user.userid ,this._deckid));
        let cardsObj: ICard[] = [];
        response.forEach((card) => {
            cardsObj.push(Card.fromCardPayload(card));
        });
        this._cards = cardsObj;
        return cardsObj;
    }

    public async addCard(card: ICard, position: number): Promise<DeckValidity> {
        if (this._cards.length == 0) {
            await this.getCards();
        }
        let cardsIDArray = this.getCardsIDArray();
        cardsIDArray.splice(position, 0, card.cardid);
        const response:UpdateDeckPayload = await this._client.rest.put(Routes.User.deckCards(this._user.userid ,this._deckid), { cards: cardsIDArray });
        this._cards = [];
        return{
            isValid: response.deck_validity.isvalid,
            issues: response.deck_validity.issues
        };
    }
    
    public async removeCard(position: number): Promise<DeckValidity> {
        if (this._cards.length == 0) {
            await this.getCards();
        }
        let cardsIDArray = this.getCardsIDArray();
        cardsIDArray.splice(position, 1);
        const response:UpdateDeckPayload = await this._client.rest.put(Routes.User.deckCards(this._user.userid ,this._deckid), { cards: cardsIDArray });
        this._cards = [];
        return{
            isValid: response.deck_validity.isvalid,
            issues: response.deck_validity.issues
        };
    }

    public async setCards(cards: ICard[]): Promise<DeckValidity> {
        let cardsIDArray = this.getCardsIDArray();
        const response:UpdateDeckPayload = await this._client.rest.put(Routes.User.deckCards(this._user.userid ,this._deckid), { cards: cardsIDArray });
        this._cards = [];
        return{
            isValid: response.deck_validity.isvalid,
            issues: response.deck_validity.issues
        };
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

    private getCardsIDArray(): number[] {
        let cardsIDArray:number[] = [];
        this._cards.forEach((card) => {
            cardsIDArray.push(card.cardid);
        });
        return cardsIDArray;
    }
}