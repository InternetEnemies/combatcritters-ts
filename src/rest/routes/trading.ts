/**
 * trading.ts
 * @created 2024-11-29
 * @brief Routes for the trading endpoints
 */

export const Routes = {
    /**
     * - GET
     * - POST
     * Get the list of trade offers/ Create a trade offer
     */
    tradeOffers() {
        return "/trading/offers";
    },

    /**
     * - POST
     * - DELETE
     * Purchase a trade offer/ Delete a trade offer
     * @param offerid id of the offer
     */
    tradeOffer(offerid: number) {
        return `/trading/offers/${offerid}`;
    }
}