import {ICard} from "./ICard";

export interface IDeck {
    deckid: number;
    name: string;
    
    /**
     * get the cards in the
     * @returns list of cards in the deck
     */
    getCards():Promise<ICard[]>;

    /**
     * set the cards in the deck
     * @param cards list of cards to set
     */
    setCards(cards:ICard[]):Promise<DeckValidity>;

    /**
     * set the local copy of the cards to the api
     * 
     */
    commit():Promise<void>;

    /**
     * reset the local copy of the cards to the api
     */
    reset():Promise<void>;

    /**
     * get the validity of this deck
     */
    getValidity():Promise<DeckValidity>;

    /**
     * get the deck id
     */
    getDeckId():number;

    /**
     * get the name of the deck
     */
    getName():string;
}

export type DeckValidity = {
    isValid:boolean,
    issues?:string[]
}