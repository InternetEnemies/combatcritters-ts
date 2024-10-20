import { IClient, IRest, Vendor, VendorReputation } from "../index";
import { IVendor } from "../index";
import { IVendorManager } from "./index";

export class VendorManager implements IVendorManager {
    private readonly _rest: IRest;

    constructor(rest: IRest) {
        this._rest = rest;
    }

    public async getVendor(id: number): Promise<IVendor> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/65
        const vendor = new Vendor(id, "Vendor", new VendorReputation(0, 0, 0, 0));
        return vendor;
    }

    public async getVendors(): Promise<IVendor[]> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/65
        const vendors: IVendor[] = [];
        for(let i = 0; i < 20; i++) {
            vendors[i] = new Vendor(i, "Vendor", new VendorReputation(0, 0, 0, 0));
        }
        return vendors;
    }
    
}