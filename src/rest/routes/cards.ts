/**
 * cards.ts
 * @created 2024-10-29
 * @brief Routes for the cards endpoints
 */

export const Routes = {
    /**
     * Route for:
     * - GET 
     * @param params query parameters for card search (optional)
     */
    cards(params:string=""){
        return `/cards${params.length > 0 ? "?" + params:""}` as const
    },
    /**
     * Route for:
     * - GET
     * @param cardid id of the card to get
     */
    singleCard(cardid:number){
        return `/cards/${cardid}` as const
    },
    User:{
        /**
         * route for:
         * - GET
         * @param userid id of the user
         * @param params cards search query (optional)
         */
        cards(userid:number, params:string=""){
            return `/users/${userid}/cards${params.length > 0 ? "?" + params : ""}` as const;
        },
        
    }
}