/**
 * IUserTradeOffer.ts
 * @created 2024-11-29
 * @brief User trade offer interface, includes delete method
 */
import {ITradeOffer} from "./ITradeOffer";

export interface IUserTradeOffer extends ITradeOffer {
    /**
     * Deletes the trade offer
     * @returns
     */
    delete(): Promise<void>;
}