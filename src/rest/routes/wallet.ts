/**
 * wallet.ts
 * @created 2024-10-29
 * @brief Routes for the wallet endpoints
 */

export const Routes = {
    User:{
        /**
         * - GET
         * Get the user's wallet
         * @param userid id of the user
        */
        wallet(userid:number){
            return `/users/${userid}/wallet`;
        }
    }
}