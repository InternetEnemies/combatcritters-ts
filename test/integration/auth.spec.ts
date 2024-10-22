import {IClient} from "../../src/"
import {BackendInstance} from "./ContainerUtil";

let client: IClient;
let container: BackendInstance



beforeEach(async () => {
    container = new BackendInstance()
    client = await container.init();
})
describe("Auth test", () => {
    
    // ! this test will fail the second time
    it("should register, login, and access privileged route", async (done) => {
        await client.register("username","password")
        await client.login("username","password")
        await client.rest.get("/ping");
        done()
    })
})

afterEach(async () => {
    await container.teardown();
})