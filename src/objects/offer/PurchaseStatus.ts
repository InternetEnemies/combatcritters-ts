import {VendorReputation as VendorRepPayload} from '../../rest/payloads';
import {IPurchaseStatus, IVendorReputation, VendorReputation} from '../index';

export class PurchaseStatus implements IPurchaseStatus{
    private readonly _isCompleted: boolean;
    private _vendorRep: IVendorReputation;

    public static fromRepPayload(payload: VendorRepPayload): PurchaseStatus {
        return new PurchaseStatus(true, 
            VendorReputation.fromVendorReputationPayload(payload));
    }

    constructor(isCompleted: boolean, vendorRep: IVendorReputation) {
        this._isCompleted = isCompleted;
        this._vendorRep = vendorRep;
    }

    public get isCompleted(): boolean {
        return this._isCompleted;
    }
    
    public get reputation():IVendorReputation{
        return this._vendorRep;
    }
}