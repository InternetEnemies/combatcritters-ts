import { ICard } from "../objects/interfaces/ICard";
import {IUserCardsManager} from "./interfaces";

export class UserCardsManager implements IUserCardsManager {
    cards: ICard[];

    addCard(card: ICard): Promise<void> {
        return Promise.resolve(undefined);
    }

    getCards(): Promise<ICard[]> {
        return Promise.resolve([]);
    }

    removeCard(card: ICard): Promise<void> {
        return Promise.resolve(undefined);
    }
}