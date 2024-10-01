import {Client} from "../../src/index.ts"

let client;



beforeEach(() => {
    client = Client.fromApi("http://localhost:8080");
})
describe("Auth test", () => {
    
    // ! this test will fail the second time
    it("should register, login, and access privileged route", async () => {
        await client.register("username","password")
        await client.login("username","password")
        await client.rest.get("/ping");
    })
})