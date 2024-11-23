import {ICurrency} from "../../objects";

/**
 * IUserCurrencyManager.ts
 * @created 2024-10-28
 * @brief Interface for the user currency manager
 */

export interface IUserCurrencyManager {
    /**
     * Get the currency the user has
     */
    getCurrency(): Promise<ICurrency>;
}