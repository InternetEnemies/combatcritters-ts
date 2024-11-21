import {BackendInstance} from "./ContainerUtil";
import {IClient, IUserPack} from "../../src";
import * as assert from "node:assert";

let client: IClient;
let container: BackendInstance

beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
    await client.register("friend","password")
    await client.register("username","password")
    await client.login("username","password")
})
describe("Friends Manager test", () => {

    it("User can get a list of friends", async () => {
        let friends = await client.user.friends.getFriends();
        assert.ok(friends.length === 0);
    })

    it("User can send friend request", async () =>{
        await client.user.friends.addFriend("friend");
    })

    it("User can can its friend request", async () =>{
        let friends = await client.user.friends.getFriendsRequests();
        assert.ok(friends.length === 0);
    })
})

afterEach(async () => {
    await container.teardown();
})