import {ICard} from "./ICard";

export interface IDeck {
    /**
     * get the cards in the
     * @returns list of cards in the deck
     */
    getCards():Promise<ICard[]>;

    /**
     * set the cards in the deck
     * @param cards list of cards to set
     * @returns the list of local cards in the deck after setting
     */
    setCards(cards:ICard[]):ICard[];

    /**
     * set the local copy of the cards to the api
     * @returns the validity of the deck
     */
    commit():Promise<DeckValidity>;

    /**
     * reset the local copy of the cards to the api
     */
    reset():Promise<void>;

    /**
     * get the validity of this deck
     */
    getValidity():Promise<DeckValidity>;

    /**
     * get the local copy of the cards in the deck
     * @returns the list of local cards in the deck
     */
    getLocalCards():ICard[];

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