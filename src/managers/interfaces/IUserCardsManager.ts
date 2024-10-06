import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../../objects/interfaces/ICardQueryBuilder";
import { ICardStack } from "../../objects/interfaces/ICardStack";

export interface IUserCardsManager {
    getCards(query: ICardQuery): Promise<ICardStack<ICard>[]>;
    getBuilder(): ICardQueryBuilder;
}