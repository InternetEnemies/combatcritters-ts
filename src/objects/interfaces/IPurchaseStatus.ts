/**
 * Interface for the PurchaseStatus object
 * The status of Offer.accept()
 */
export interface IPurchaseStatus {
    isCompleted: boolean;
    vendorID: number;
    xpChange: number;
}