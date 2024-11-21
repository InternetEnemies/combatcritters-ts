import {ICard} from "./ICard";
import {IDeckValidity} from "./IDeckValidity";

export interface IDeck {
    deckid:number;
    name:string;
    
    /**
     * get the cards in the
     * @returns list of cards in the deck
     */
    getCards():Promise<ICard[]>;

    /**
     * set the cards in the deck
     * @param cards list of cards to set
     * @returns the local deck
     */
    setCards(cards:ICard[]):ICard[];

    /**
     * set the local copy of the cards to the api
     * @returns the validity of the deck
     */
    commit():Promise<IDeckValidity>;

    /**
     * reset the local copy of the cards to the api
     */
    reset():Promise<void>;

    /**
     * get the validity of this deck
     */
    getValidity():Promise<IDeckValidity>;
}