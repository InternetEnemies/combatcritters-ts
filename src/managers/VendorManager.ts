import { IClient, IRest, Routes, Vendor, VendorReputation } from "../index";
import { IVendor } from "../index";
import { IVendorManager } from "./index";
import { Vendor as VendorPayload, VendorReputation as VendorReputationPayload } from "../rest/payloads";

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