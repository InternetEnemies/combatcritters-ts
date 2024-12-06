import {TradeOffer} from "./TradeOffer";
import {IUserTradeOffer} from "../interfaces";

/**
 * UserTradeOffer.ts
 * @created 2024-11-29
 * @brief trade offer object that own by the user
 */

export class UserTradeOffer extends TradeOffer implements IUserTradeOffer {
    public async delete(): Promise<void> {
        return Promise.resolve(undefined);
    }
}