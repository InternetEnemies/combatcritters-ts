import {CardsManager, ICardsManager, IClient} from ".";
import {IClientComponentFactory} from "./IClientComponentFactory";

/**
 * @Created 2024-10-22
 * @Brief default implementation for getting components for the base client instance
 */
export class ClientComponentFactory implements IClientComponentFactory {
    getCardsManager(client:IClient): ICardsManager {
        return new CardsManager(client);
    }
    
}