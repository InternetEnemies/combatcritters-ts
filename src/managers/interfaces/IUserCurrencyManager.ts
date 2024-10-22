import { ICurrency } from "../../index";

export interface IUserCurrencyManager {
    /**
     * Get the currency the user has
     */
    getCurrency(): Promise<ICurrency>;
}