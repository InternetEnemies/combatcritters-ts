import {BackendInstance} from "./ContainerUtil";
import {IClient, IDeck, IDeckManager, IUserPack} from "../../src";
import * as assert from "node:assert";

/**
 * Deck Manager integration test
 */

let client: IClient;
let container: BackendInstance;
let manager: IDeckManager;

beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
    await client.register("username","password")
    await client.login("username","password")
    manager = client.user.decks;
})
describe("Deck Manager test", () => {

    it("User has zero deck at init", async () => {
        let decks:IDeck[] = await manager.getDecks();
        assert.ok(decks.length === 0)
    })

    it("User can create a deck", async () => {
        let deck:IDeck = await manager.createDeck("deckname");
        assert.ok(deck.name === "deckname")
        let decks:IDeck[] = await manager.getDecks();
        assert.ok(decks.length === 1)
    })

    it("User can have multiple decks", async () => {
        let deck:IDeck = await manager.createDeck("deckname");
        let deck2:IDeck = await manager.createDeck("deckname2");
        let decks:IDeck[] = await manager.getDecks();
        assert.ok(decks.length === 2)
    })

    it("User can delete a deck", async () => {
        let deck:IDeck = await manager.createDeck("deckname");
        let decks:IDeck[] = await manager.getDecks();
        assert.ok(decks.length === 1)
        await manager.deleteDeck(deck);
        decks = await manager.getDecks();
        assert.ok(decks.length === 0)
    })
})

afterEach(async () => {
    await container.teardown();
})