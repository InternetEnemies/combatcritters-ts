import {IItemStack, IUserPack} from "../../objects";


export interface IPacksManager {
    /**
     * get user packs
     * @returns Promise<IPack[]> the packs the user has
     */
    getPacks(): Promise<IItemStack<IUserPack>[]>;
}