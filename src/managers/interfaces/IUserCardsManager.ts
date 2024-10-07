import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../../objects/interfaces/ICardQueryBuilder";
import { IItemStack } from "../../objects/interfaces/IItemStack";

export interface IUserCardsManager {
    getCards(query: ICardQuery): Promise<IItemStack<ICard>[]>;
    getBuilder(): ICardQueryBuilder;
}