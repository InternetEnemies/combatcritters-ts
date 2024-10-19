export interface IUserCurrencyManager {
    /**
     * Get the amount of coins the user has
     */
    getCoins(): Promise<number>;
}