import { ICard } from "../../objects";
import { ICardQuery } from "../../objects/interfaces/ICardQuery";

export interface IUserCardsManager {
    getCard(id: number): Promise<ICard>; // This method set the CardQuery.owned to be yes
    getCards(query: ICardQuery): Promise<ICard[]>; // This method set the CardQuery.owned to be yes
}