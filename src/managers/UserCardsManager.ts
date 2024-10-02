import { ICard } from "../objects/interfaces/ICard";
import { Routes } from "../rest";
import { IRest } from "../rest/IRest";
import { UserPayload, Card } from "../rest/payloads";
import {IUserCardsManager} from "./interfaces";

export class UserCardsManager implements IUserCardsManager {
    private readonly _user : UserPayload;
    private readonly _rest: IRest;

    constructor(user:UserPayload, rest:IRest) {
        this._user = user;
        this._rest = rest;
    }

    addCard(card: ICard): Promise<void> {
        return Promise.resolve(undefined);
    }

    public async getCards(): Promise<ICard[]> {
        const userCards:ICard[] = await this._rest.get(Routes.Cards.User.cards(this._user.id));
        return userCards;
    }

    removeCard(card: ICard): Promise<void> {
        return Promise.resolve(undefined);
    }
}