import {BackendInstance} from "./ContainerUtil";
import {IClient, IUserPack} from "../../src";
import * as assert from "node:assert";

/**
 * Currency integration test
 */

let client: IClient;
let container: BackendInstance

beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
    await client.register("username","password")
    await client.login("username","password")
})
describe("Currency test", () => {

    it("get user wallet", async() => {
        let coinsObj = await client.user.currency.getCurrency();
        let coins = coinsObj.coins;
        assert.ok(coins > 0);
    })

})

afterEach(async () => {
    await container.teardown();
})