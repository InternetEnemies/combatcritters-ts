import { IItemStack } from "../index";

export interface IOffer {
    offerID: number;
    receiveItem: IItemStack<any>;
    giveItem: IItemStack<any>[];

    /**
     * Compare the items the user has to the items the offer gives
     * @returns list of items the user misses to get the offer
     */
    compareUserItems(): IItemStack<any>[];
}