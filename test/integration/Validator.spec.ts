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
describe("Local deck validator", () => {

    it("validate an empty list", async() => {
        let validator = client.user.decks.validator;
        let result = await validator.validate([]);
        assert.ok(!result.isValid)
    })

    it("validate a single own car list", async() => {
        let validator = client.user.decks.validator;
        let query = client.user.cards.getBuilder();
        query.setOwned();
        let list = await client.user.cards.getCards(query.build());
        assert.ok(list.length > 0)
        let deckList = [];
        deckList.push(list.pop().getItem());
        let result =  await validator.validate(deckList);
        assert.ok(!result.isValid)
        assert.ok(result.issues.length === 1)
    })

    it("validate not enough amount of a single car list", async() => {
        let validator = client.user.decks.validator;
        let query = client.user.cards.getBuilder();
        query.setOwned();
        let list = await client.user.cards.getCards(query.build());
        assert.ok(list.length > 0)
        let deckList = [];
        deckList.push(list[0].getItem());
        deckList.push(list[0].getItem());
        let result = await validator.validate(deckList);
        assert.ok(!result.isValid)
    })
})

afterEach(async () => {
    await container.teardown();
})