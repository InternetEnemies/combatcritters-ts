import {BackendInstance} from "./ContainerUtil";
import {IClient, IUserPack} from "../../src";
import * as assert from "node:assert";

/**
 * User Pack integration test
 */

let client: IClient;
let container: BackendInstance

beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
    await client.register("username","password")
    await client.login("username","password")
})
describe("User Packs", () => {

    it("User can open a pack", async () => {
        let packs = await client.user.packs.getPacks()
        let pack:IUserPack = packs.pop().getItem()
        let cards = await pack.open();
        assert.ok(cards.length > 0)
    })
})

afterEach(async () => {
    await container.teardown();
})
