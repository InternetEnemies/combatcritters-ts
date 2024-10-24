import { ICard, ICurrency, IItemStack, IPack, ITradeItem } from "../index";

export interface IOffer {
    offerID: number;
    receiveItem: IItemStack<ICurrency | ICard | IPack>;
    giveItem: IItemStack<ICurrency | ICard | IPack>[];

    /**
     * Compare the items the user has to the items the offer gives
     * @returns list of items the user misses to get the offer
     */
    compareUserItems(): ITradeItem<ICard | IPack | ICurrency>[];
}