import { DockerComposeEnvironment, StartedDockerComposeEnvironment} from "testcontainers";
import {Client, IClient} from "../../src";

const API_PORT = 4000;
const API_URL = `http://localhost:${API_PORT}`;

const COMPOSE_PATH = "./test/integration"
const COMPOSE_FILE = "docker-compose.yaml"

export class BackendInstance {
    private _apiContainer: StartedDockerComposeEnvironment;
    
    async init() : Promise<IClient> {
        
        this._apiContainer = await new DockerComposeEnvironment(COMPOSE_PATH, COMPOSE_FILE).up();
        
        return Client.fromApi(API_URL);
    }
    
    async teardown() {
        await this._apiContainer.stop()
    }
}
