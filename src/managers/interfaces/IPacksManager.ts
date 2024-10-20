import { IPack } from "../../objects/index";

export interface IPacksManager {
    /**
     * get user packs
     * @returns Promise<IPack[]> the packs the user has
     */
    getPacks(): Promise<IPack[]>;
}