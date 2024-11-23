import { DockerComposeEnvironment, StartedDockerComposeEnvironment} from "testcontainers";
import axios, {AxiosInstance} from "axios"
import {wrapper} from "axios-cookiejar-support";
import {CookieJar} from "tough-cookie";
import {Client, ClientComponentFactory, IClient, Rest} from "../../src";

/**
 * BackendInstance
 */

const API_PORT = 4000;
const API_URL = `http://localhost:${API_PORT}`;

const COMPOSE_PATH = "./test/integration"
const COMPOSE_FILE = "docker-compose.yaml"

export class BackendInstance {
    private _apiContainer: StartedDockerComposeEnvironment;
    
    async init() : Promise<IClient> {
        
        this._apiContainer = await new DockerComposeEnvironment(COMPOSE_PATH, COMPOSE_FILE).up();
        
        
        
        return this.getClient();
    }
    
    getClient() :IClient {
        const jar = new CookieJar();
        let axiosInstance:AxiosInstance = wrapper(axios
            .create({
                jar:jar,
                baseURL:API_URL,
                withCredentials: true
            }))
        return new Client(new ClientComponentFactory(), new Rest(API_URL,axiosInstance))
    }
    
    async teardown() {
        await this._apiContainer.stop()
    }
}
