import {IOfferProto} from "./IOfferProto";
import {IUser} from "./IUser";
import {IUserInfo} from "./IUserInfo";

/**
 * ITradeOffer.ts
 * @created 2024-11-29
 * @brief Trade offer interface
 */

export interface ITradeOffer extends IOfferProto {
    offerID: number;
    user: IUserInfo;

    /**
     * Accepts the trade offer.
     * @returns
     */
    accept(): Promise<void>;
}