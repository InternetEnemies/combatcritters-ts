import {IVendorReputation} from "./IVendorReputation";

/**
 * Interface for the PurchaseStatus object
 * The status of Offer.accept()
 */
export interface IPurchaseStatus {
    isCompleted: boolean;
    reputation: IVendorReputation
}