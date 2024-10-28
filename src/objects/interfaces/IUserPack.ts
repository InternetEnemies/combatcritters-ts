import { ICard, IPack, IUser } from './index';

export interface IUserPack extends IPack {
    user: IUser;
    /**
     * Get the list of cards that user may get in the pack
     * @returns list of cards in the pack
     */
    open(): Promise<ICard[]>;
}