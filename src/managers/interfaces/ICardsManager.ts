import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../../objects/interfaces/ICardQueryBuilder";

export interface ICardsManager {
    getCard(id: number): Promise<ICard>;
    getCards(query: ICardQuery): Promise<ICard[]>;
    getBuilder(): ICardQueryBuilder;
}