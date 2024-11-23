/**
 * decks.ts
 * @created 2024-10-29
 * @brief Routes for the decks endpoints
 */

export const Routes = {
    /**
     * - GET
     * deck validity rules route
     */
    validity(){
        return "/decks/validity";
    },
    User:{
        /**
         * - POST
         * - GET
         * @param userid id of user
         */
        decks(userid:number){
            return `/users/${userid}/decks`;
        },
        /**
         * - DELETE
         */
        singleDeck(userid:number, deckid:number){
            return `/users/${userid}/decks/${deckid}`;
        },
        /**
         * - GET
         * - PUT
         */
        deckCards(userid:number, deckid:number){
            return `/users/${userid}/decks/${deckid}/cards`;
        },
        /**
         * - GET
         */
        deckValidity(userid:number, deckid:number){
            return `/users/${userid}/decks/${deckid}/validity`;
        }
    }
}