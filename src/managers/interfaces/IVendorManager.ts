import {IVendor} from "../../objects";

/**
 * IVendorManager.ts
 * @created 2024-10-19
 * @brief Interface for the vendor manager
 */

export interface IVendorManager {
    /**
     * Get vendors by a query
     * @returns Promise<IVendor[]> the vendors that match the query
     */
    getVendors(): Promise<IVendor[]>;

    /**
     * Get a vendor by id
     * @param id the id of the vendor
     * @returns Promise<IVendor> the vendor with the id
     */
    getVendor(id: number): Promise<IVendor>;
}