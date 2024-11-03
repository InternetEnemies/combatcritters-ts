import {BackendInstance} from "./ContainerUtil";
import {IClient, IUserPack} from "../../src";
import * as assert from "node:assert";

let client: IClient;
let container: BackendInstance

beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
    await client.register("username","password")
    await client.login("username","password")
})
describe("Vendor Manager", () => {

    it("User can look at available vendors", async () => {
        let vendors = await client.vendors.getVendors();
        assert.ok(vendors.length > 0)
    })

    it("User can look at vendor's offer", async () => {
        let vendors = await client.vendors.getVendors();
        let offers = await vendors[0].getOffers();
        assert.ok(offers.length > 0)
    })

    it("User can look at vendor's discount offer", async () => {
        let vendors = await client.vendors.getVendors();
        let offers = await vendors[0].discountOffers();
        assert.ok(offers.length > 0)
    })

    it("User can look at vendor's special offer", async () => {
        let vendors = await client.vendors.getVendors();
        let offers = await vendors[0].getSpecialOffers();
        assert.ok(offers.length > 0)
    })
})

afterEach(async () => {
    await container.teardown();
})