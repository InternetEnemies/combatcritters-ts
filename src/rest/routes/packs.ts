export const Routes = {
    /**
     * - GET
     * Get the list of packs
     */
    packs(){
        return "/packs";
    },
    /**
     * - GET
     * Get a pack by id
     * @param packid id of the pack
     */
    pack(packid:number){
        return `/packs/${packid}`;
    },
    /**
     * - GET
     * Get pack contents
     * @param packid id of the pack
     */
    packContents(packid:number){
        return `/packs/${packid}/contents`;
    },
    User:{
        /**
         * - GET
         * Get the packs in the users inventory
         * @param userid id of the user
         */
        packs(userid:number){
            return `/users/${userid}/packs`;
        },
        /**
         * - POST
         * Open the pack from its id
         * @param userid id of the user
         * @param packid id of the pack
         */
        openPack(userid:number, packid:number){
            return `/users/${userid}/packs/${packid}`;
        }
    }
}