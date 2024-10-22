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