import { IVendor } from "../../index";

export interface IVendorManager {
    /**
     * Get vendors by a query
     * @returns Promise<IVendor[]> the vendors that match the query
     */
    getVendors(): Promise<IVendor[]>;
}