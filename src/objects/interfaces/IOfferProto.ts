import {IItemStack} from "./IItemStack";
import {ICurrency} from "./ICurrency";
import {ICard} from "./ICard";
import {IPack} from "./IPack";
import {IUserOfferState} from "./IUserOfferState";

/**
 * IOfferProto.ts
 * @created 2024-11-29
 * @brief Abstract offer interface for both market and trading
 */

export interface IOfferProto {
    receiveItem: IItemStack<ICurrency | ICard | IPack>;
    giveItem: IItemStack<ICurrency | ICard | IPack>[];

    /**
     * Compare the items the user has to the items the offer gives
     * @returns list of items the user misses to get the offer
     */
    compareUserItems(): Promise<IUserOfferState<IPack | ICard | ICurrency>>;
}