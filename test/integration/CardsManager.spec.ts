import {BackendInstance} from "./ContainerUtil";
import {CardsManager, ICard, ICardQuery, ICardQueryBuilder, ICardsManager, IClient, IUserPack} from "../../src";
import * as assert from "node:assert";

/**
 * Cards Manager integration test
 */

let client: IClient;
let container: BackendInstance;
let manager: ICardsManager;

beforeEach(async () => {
    container = new BackendInstance();
    client = await container.init();
    await client.register("username","password");
    await client.login("username","password");
    manager = new CardsManager(client);
})
describe("Cards Manager test", () => {

    it("getCard", async () => {
        let card: ICard = await manager.getCard(1);
        assert.ok(card.cardid === 1)
    })

    it("getCards", async () => {
        let builder: ICardQueryBuilder = manager.getBuilder();
        let query: ICardQuery = builder.build();
        let cards: ICard[] = await manager.getCards(query);
        assert.ok(cards.length > 0);
    })

    it("getCards with limit", async () => {
        let builder: ICardQueryBuilder = manager.getBuilder();
        builder.setIds([1]);
        let query: ICardQuery = builder.build();
        let cards: ICard[] = await manager.getCards(query);
        assert.ok(cards[0].cardid === 1);
    })

    it('get user cards', async () => {
        let builder: ICardQueryBuilder = manager.getBuilder();
        builder.setOwned();
        let query: ICardQuery = builder.build();
        let cards: ICard[] = await manager.getCards(query);
        assert.ok(cards.length > 0);
    });
})

afterEach(async () => {
    await container.teardown();
})