import {IPack} from "./IPack";
import {IUser} from "./IUser";
import {ICard} from "./ICard";

/**
 * IUserPack.ts
 * @created 2024-10-29
 * @brief User Pack interface
 */

export interface IUserPack extends IPack {
    user: IUser;
    quantity: number;
    /**
     * Get the list of cards that user may get in the pack
     * @returns list of cards in the pack
     */
    open(): Promise<ICard[]>;
}