import { ICard } from "../objects";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import {IUserCardsManager} from "./interfaces";

export class UserCardsManager implements IUserCardsManager {
    getCard(id: number): Promise<ICard> {
        throw new Error("Method not implemented.");
    }
    getCards(query: ICardQuery): Promise<ICard[]> {
        throw new Error("Method not implemented.");
    }
    getBuilder(): ICardQueryBuilder {
        throw new Error("Method not implemented.");
    }
}