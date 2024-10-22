import {ICardsManager, IOffersManager, IVendorManager} from "./managers";
import {IClient} from "./IClient";

export interface IClientComponentFactory {
    /**
     * Create a Cards Manager
     */
    getCardsManager(client:IClient):ICardsManager

    /**
     * create a vendor manager
     */
    getVendorManager(client:IClient):IVendorManager

    /**
     * create an offer manager
     */
    getOffersManager(client:IClient):IOffersManager
}