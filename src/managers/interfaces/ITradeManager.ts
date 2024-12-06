/**
 * ITradeManager.ts
 * @created 2024-11-29
 * @brief Interface for the trade manager
 */
import {ITradeOffer} from "../../objects";

export interface ITradeManager {
    /**
     * Get the trade offers
     * @returns Promise<ITradeOffer[]> the trade offers
     */
    getTradeOffers(): Promise<ITradeOffer[]>;
}