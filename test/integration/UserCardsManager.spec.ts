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
describe("User Cards Manager test", () => {

    it("get Cards", async () => {
        let builder = client.user.cards.getBuilder();
        let cards = await client.user.cards.getCards(builder.build());
        assert.ok(cards.length > 0)
    })
})

afterEach(async () => {
    await container.teardown();
})