import {ICurrency} from "../../objects";


export interface IUserCurrencyManager {
    /**
     * Get the currency the user has
     */
    getCurrency(): Promise<ICurrency>;
}