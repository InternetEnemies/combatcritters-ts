import { IUserPack } from "../../objects/index";

export interface IUserPacksManager {
    /**
     * get user packs
     * @returns Promise<IPack[]> the packs the user has
     */
    getPacks(): Promise<IUserPack[]>;
}