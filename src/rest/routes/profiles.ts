/**
 * profiles.ts
 * @created 2024-10-29
 * @brief Routes for the profiles endpoint
 */

export const Routes = {
    User:{
        /**
         *  - GET
         *  - PUT
         *  @param userid id of the user
         */
        profile(userid:number){
            return `/users/${userid}/profile`;
        }
    }
}