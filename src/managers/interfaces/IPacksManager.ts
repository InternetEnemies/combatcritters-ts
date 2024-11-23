import {IItemStack, IUserPack} from "../../objects";

/**
 * IPacksManager.ts
 * @created 2024-10-28
 * @brief Interface for the packs manager
 */

export interface IPacksManager {
    /**
     * get user packs
     * @returns Promise<IPack[]> the packs the user has
     */
    getPacks(): Promise<IItemStack<IUserPack>[]>;
}