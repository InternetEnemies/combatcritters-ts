export const Routes = {
    User:{
        /**
         * - GET
         * - POST
         * @param userid id of user
         */
        friends(userid:number){
            return `/users/${userid}/friends`;
        },
        /**
         * - GET
         * @param userid id of user
         */
        friendRequests(userid:number){
            return `/users/${userid}/friends/pending`;
        }
    }
}