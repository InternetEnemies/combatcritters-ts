import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../../objects/interfaces/ICardQueryBuilder";

export interface IUserCardsManager {
    getCards(query: ICardQuery): Promise<ICard[]>;
    getBuilder(): ICardQueryBuilder;
}