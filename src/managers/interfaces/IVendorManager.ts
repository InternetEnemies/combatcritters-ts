import { IVendor } from "../../index";

export interface IVendorManager {
    /**
     * Get a vendor by its id
     * @param id the id of the vendor to get
     */
    getVendor(id: number): Promise<IVendor>;
    /**
     * Get vendors by a query
     * @returns Promise<IVendor[]> the vendors that match the query
     */
    getVendors(): Promise<IVendor[]>;
}