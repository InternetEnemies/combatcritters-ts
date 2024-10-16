import {ICard} from "./index";

export interface IPack {
    image: string;
    name: string;
    packid: number;

    /**
     * Get the list of cards that user may get in the pack
     * @returns list of cards in the pack
     */
    getSetList(): Promise<ICard[]>;

    /**
     * Open the pack and get the cards
     * @returns list of cards in the pack
     */
    open(): Promise<ICard[]>;
}