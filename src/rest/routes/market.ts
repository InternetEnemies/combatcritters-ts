/**
 * market.ts
 * @created 2024-10-29
 * @brief Routes for the market endpoints
 */

export const Routes = {
    /**
     * - GET
     * Get the list of vendors
     */
    vendors(){
        return "/vendors";
    },
    /**
     * - GET
     * Get a vendor
     * @param vendorid id of the vendor
     */
    vendor(vendorid:number){
        return `/vendors/${vendorid}`
    },
    /**
     * - GET
     * Get a vendor's offers
     * @param vendorid id of the vendor
     */
    vendorOffers(vendorid:number){
        return `/vendors/${vendorid}/offers`;
    },
    /**
     * - GET
     * Get a vendor's special offers
     * @param vendorid id of the vendor
     */
    vendorSpecialOffers(vendorid:number){
        return `/vendors/${vendorid}/specials`;
    },
    /**
     * - GET
     * Get a vendor's discount offers
     * @param vendorid id of the vendor
     */
    vendorDiscounts(vendorid:number){
        return `/vendors/${vendorid}/discounts`;
    },
    /**
     * - POST
     * Purchase a vendor offer, made by the user who is signed in
     * @param vendorid id of the vendor
     * @param offerid id of the offer
     */
    purchaseOffer(vendorid:number, offerid:number){
        return `/vendors/${vendorid}/offers/${offerid}`;
    }
}