import { ICard } from "../../objects/interfaces/ICard";

export interface IUserCardsManager {
    cards: ICard[];

    /**
     * get the cards for the user
     */
    getCards(): Promise<ICard[]>;

    /**
     * add a card to the user's collection
     * @param card
     */
    addCard(card:ICard):Promise<void>;

    /**
     * remove a card from the user's collection
     * @param card
     */
    removeCard(card:ICard):Promise<void>;
}