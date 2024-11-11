import {ICardsManager, IVendorManager} from "./managers";
import {IClient} from "./IClient";

/**
 * @Created 2024-10-22
 * @Brief interface getting components for the base client instance
 */

export interface IClientComponentFactory {
    /**
     * Create a Cards Manager
     */
    getCardsManager(client:IClient):ICardsManager

    /**
     * create a vendor manager
     */
    getVendorManager(client:IClient):IVendorManager
}