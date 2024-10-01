import {ICard} from "./ICard";

export interface IDeck {
    deckid: number;
    name: string;
    /**
     * ordered list of the cards in the deck
     */
    cards:ICard[];
    /**
     * add a card at a specific position
     * @param card card to add
     * @param position position to add the card
     */
    addCard(card:ICard, position:number):Promise<DeckValidity>;

    /**
     * remove a card from the given position
     * @param position position to remove the card from 
     */
    removeCard(position:number):Promise<DeckValidity>;

    /**
     * delete this deck
     */
    delete():Promise<void>;

    /**
     * get the validity of this deck
     */
    getValidity():Promise<DeckValidity>;
}

export type DeckValidity = {
    isValid:boolean,
    issues?:string[]
}