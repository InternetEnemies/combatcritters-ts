import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";

export interface ICardsManager {
    getCard(id: number): Promise<ICard>;
    getCards(query: ICardQuery): Promise<ICard[]>;
}