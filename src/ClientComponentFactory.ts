import {CardsManager, ICardsManager, IClient, IVendorManager, VendorManager} from ".";
import {IClientComponentFactory} from "./IClientComponentFactory";

/**
 * ClientComponentFactory.ts
 * @Created 2024-10-22
 * @Brief default implementation for getting components for the base client instance
 */
export class ClientComponentFactory implements IClientComponentFactory {
    getVendorManager(client: IClient): IVendorManager {
        return new VendorManager(client);
    }
    getCardsManager(client:IClient): ICardsManager {
        return new CardsManager(client);
    }
    
}