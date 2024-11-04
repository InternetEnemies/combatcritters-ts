import {CardsManager, ICardsManager, IClient, IOffersManager, IVendorManager, OffersManager, VendorManager} from ".";
import {IClientComponentFactory} from "./IClientComponentFactory";

/**
 * @Created 2024-10-22
 * @Brief default implementation for getting components for the base client instance
 */
export class ClientComponentFactory implements IClientComponentFactory {
    getVendorManager(client: IClient): IVendorManager {
        return new VendorManager(client);
    }
    getOffersManager(client: IClient): IOffersManager {
        return new OffersManager(client);
    }
    getCardsManager(client:IClient): ICardsManager {
        return new CardsManager(client);
    }
    
}