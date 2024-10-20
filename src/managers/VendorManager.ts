import { IClient, IRest } from "../index";
import { IVendor } from "../index";
import { IVendorManager } from "./index";

export class VendorManager implements IVendorManager {
    private readonly _rest: IRest;

    constructor(rest: IRest) {
        this._rest = rest;
    }

    getVendor(id: number): Promise<IVendor> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/65
        throw new Error("Method not implemented.");
    }
    getVendors(): Promise<IVendor[]> {
        //TODO: Implement this method
        // https://github.com/InternetEnemies/combatcritters-ts/issues/65
        throw new Error("Method not implemented.");
    }
    
}