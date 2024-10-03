import { ICard } from "./interfaces";
import {DeckValidity, IDeck} from "./interfaces/IDeck";

export class Deck implements IDeck {
    private readonly _deckid: number;
    private readonly _name: string;
    private readonly _cards: ICard[];

    constructor(deckid: number, name: string, cards: ICard[]) {
        this._deckid = deckid;
        this._name = name;
        this._cards = cards;
    }

    public async addCard(card: ICard, position: number): Promise<DeckValidity> {
        throw new Error("Method not implemented.");
    }
    
    public async removeCard(position: number): Promise<DeckValidity> {
        throw new Error("Method not implemented.");
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