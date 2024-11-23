import {IVendorReputation} from "./IVendorReputation";

/**
 * IPurchaseStatus.ts
 * @created 2024-10-29
 * @brief Interface for the PurchaseStatus object
 * The status of Offer.accept()
 */
export interface IPurchaseStatus {
    isCompleted: boolean;
    reputation: IVendorReputation
}