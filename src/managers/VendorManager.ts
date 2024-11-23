import {IVendorManager} from "./interfaces";
import {IClient} from "../IClient";
import {IVendor, Vendor} from "../objects";
import {Routes} from "../rest";
import {Vendor as VendorPayload} from "../rest/payloads";

/**
 * VendorManager.ts
 * @created 2024-10-19
 * @brief Manager for vendors
 */

export class VendorManager implements IVendorManager {
    private readonly _client: IClient;

    constructor(client: IClient) {
        this._client = client;
    }

    public async getVendors(): Promise<IVendor[]> {
        const response: VendorPayload[] = await this._client.rest.get(Routes.Market.vendors());
        return response.map((vendor) => {
            return Vendor.fromVendorPayload(vendor, this._client);
        });
    }

    public async getVendor(id: number): Promise<IVendor> {
        const response: VendorPayload = await this._client.rest.get(Routes.Market.vendor(id));
        return Vendor.fromVendorPayload(response, this._client);
    }
    
}