import {StartedTestContainer, GenericContainer, Network, StartedNetwork} from "testcontainers";
import {PostgreSqlContainer} from "@testcontainers/postgresql";
import {Client, IClient, Rest} from "../../src";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios"

const API_PORT = 8080;
const API_URL = `http://localhost:${API_PORT}`;
const API_IMAGE = "vanjackal/combatcritters:latest";

const DB_NAME = "critter_db";
const DB_USER = "critter_db";
const DB_PASS = "critter_db";
const DB_HOST = "postgres";
const DB_PORT = 5432;

export class BackendInstance {
    private _apiContainer: StartedTestContainer;
    private _postgresContainer: StartedTestContainer;
    private _network: StartedNetwork;
    
    async init() : Promise<IClient> {
        this._network = await new Network().start();
        
        this._postgresContainer = await new PostgreSqlContainer()
            .withDatabase(DB_NAME)
            .withUsername(DB_USER)
            .withPassword(DB_PASS)
            .withNetwork(this._network)
            .withExposedPorts(DB_PORT)
            .withNetworkAliases(DB_HOST)
            .start()
        
        this._apiContainer = await new GenericContainer(API_IMAGE)
            .withExposedPorts(API_PORT)
            .withEnvironment({DB_HOST:`${DB_HOST}:${DB_PORT}`, DB_USER:DB_USER, DB_PASS:DB_PASS})
            .withNetwork(this._network)
            .start()
        
        
        while (1) {
            try{
                await axios.get(`${API_URL}/ping`,{timeout:250})
                break;
            } catch (e) {
                await new Promise(resolve => setTimeout(resolve, 50)); // wait 50ms before retry
            }
        }
        
        return Client.fromApi(API_URL);
            
    }
    
    async teardown() {
        await this._apiContainer.stop()
        await this._postgresContainer.stop()
        await this._network.stop()
    }
}
