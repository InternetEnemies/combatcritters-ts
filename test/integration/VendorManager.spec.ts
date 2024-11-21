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

    it("User can look up a specific vendor by its id", async () => {
        let vendors = await client.vendors.getVendors();
        let id = vendors[0].id;
        let vendor = await client.vendors.getVendor(id);
        assert.ok(vendor.id === vendors[0].id)
    })

    it("User can look at vendor's offer", async () => {
        let vendors = await client.vendors.getVendors();
        let offers = await vendors[0].getOffers();
        assert.ok(offers.length > 0)
    })

    it("Test offer.compareItems", async () => {
        let vendors = await client.vendors.getVendors();
        let offers1 = await vendors[1].getOffers();
        let offerstate1 = await offers1[0].compareUserItems();
        assert.ok(offerstate1.canPurchase)
        assert.ok(offerstate1.userOfferItems.length === 1)
        assert.ok(offerstate1.userOfferItems[0].userItem.getAmount() === 100)
        assert.ok(offerstate1.userOfferItems[0].giveItem.getAmount() === 1)
    })

    it("Test offer.accept", async () => {
        let vendors = await client.vendors.getVendors();
        let offers1 = await vendors[0].getOffers();
        let offerstate1 =  await offers1[0].accept();
        assert.ok(offerstate1.isCompleted === true)
    })

    it("User can look at vendor's discount offer", async () => {
        // ok to fail if no discount offers
        let vendors = await client.vendors.getVendors();
        let offers = await vendors[0].discountOffers();
        assert.ok(offers.length > 0)
    })

    it("User can look at vendor's special offer", async () => {
        // ok to fail if no special offers
        let vendors = await client.vendors.getVendors();
        let offers = await vendors[0].getSpecialOffers();
        assert.ok(offers.length > 0)
    })
})

afterEach(async () => {
    await container.teardown();
})