import {Client} from "../../src/index.ts"

let client = Client.fromApi("http://localhost:8080");



describe("Auth test", () => {
    it("should login", async () => {
        await client.login("jackal","jackal")
        await client.rest.get("/ping");
    })
})