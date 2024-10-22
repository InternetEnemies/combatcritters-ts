import {ICardsManager} from "./managers";
import {IClient} from "./IClient";

export interface IClientComponentFactory {
    /**
     * Create a Cards Manager
     */
    getCardsManager(client:IClient):ICardsManager
}