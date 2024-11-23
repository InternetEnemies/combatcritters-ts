import {IClient} from "../../src/"
import {BackendInstance} from "./ContainerUtil";

/**
 * Auth integration test
 */

let client: IClient;
let container: BackendInstance

beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
})
describe("Auth test", () => {
    
    it("should register, login, and access privileged route", async () => {
        await client.register("username","password")
        await client.login("username","password")
        await client.rest.get("/ping");
    })
})

afterEach(async () => {
    await container.teardown();
})