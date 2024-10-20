import { IClient, IRest } from "../index";
import { IVendor } from "../index";
import { IVendorManager } from "./index";

export class VendorManager implements IVendorManager {
    private readonly _rest: IRest;

    constructor(rest: IRest) {
        this._rest = rest;
    }

    getVendor(id: number): Promise<IVendor> {
        throw new Error("Method not implemented.");
    }
    getVendors(): Promise<IVendor[]> {
        throw new Error("Method not implemented.");
    }
    
}