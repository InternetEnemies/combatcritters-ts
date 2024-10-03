import { ICard } from "../objects";
import { ICardQuery } from "../objects/interfaces/ICardQuery";
import { ICardQueryBuilder } from "../objects/interfaces/ICardQueryBuilder";
import { IUserCardsManager } from "./interfaces";
import { IClient } from "../IClient";

export class UserCardsManager implements IUserCardsManager {
    private readonly _client: IClient;

    constructor(client:IClient){
        this._client = client;
    }

    public async getCard(id: number): Promise<ICard> {
        throw new Error("Method not implemented.");
    }

    public async getCards(query: ICardQuery): Promise<ICard[]> {
        throw new Error("Method not implemented.");
    }

    public getBuilder(): ICardQueryBuilder {
        throw new Error("Method not implemented.");
    }
}