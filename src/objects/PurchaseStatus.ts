import { RepChange } from '../rest/payloads';
import { IPurchaseStatus } from './interfaces/index';

export class PurchaseStatus implements IPurchaseStatus{
    private readonly _isCompleted: boolean;
    private readonly _vendorID: number;
    private readonly _xpChange: number;

    public static fromRepChangePayload(payload: RepChange): PurchaseStatus {
        return new PurchaseStatus(true, 
            payload.vendor, 
            payload.amount);
    }

    constructor(isCompleted: boolean, vendorID: number, xpChange: number) {
        this._isCompleted = isCompleted;
        this._vendorID = vendorID;
        this._xpChange = xpChange;
    }

    public get isCompleted(): boolean {
        return this._isCompleted;
    }
    public get vendorID(): number {
        return this._vendorID;
    }
    public get xpChange(): number {
        return this._xpChange;
    }
}