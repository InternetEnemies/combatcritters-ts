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