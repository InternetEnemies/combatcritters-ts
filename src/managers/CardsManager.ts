import {ICardsManager} from "./interfaces";
import {ICard} from "../objects";

export class CardsManager implements ICardsManager {
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
    //todo
}