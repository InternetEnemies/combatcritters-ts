import {CardRarity, ICard, IDeckValidator, IDeckValidity, IItemStack, DeckIssues} from "../interfaces";
import {DeckRules} from "../../rest/payloads";
import {IClient} from "../../IClient";
import {IUserCardsManager} from "../../managers";
import {ItemStack} from "../itemstack";
import {DeckValidity} from "./DeckValidity";
import {CardItem, CardQueryBuilder} from "../card";
import {Routes} from "../../rest";

/**
 * DeckValidator.ts
 * @created 2024-10-29
 * @brief DeckValidator object, identical logic from the backend
 */

export class DeckValidator implements IDeckValidator {
    private _ownedCards!: Promise<IItemStack<ICard>[]>;
    private _rules: Promise<DeckRules>;
    private _client: IClient;
    private _userCards: IUserCardsManager;
    private issues: Array<string>;

    public static countCards(cards: ICard[]): ItemStack<ICard>[] {
        let cardStacks: ItemStack<ICard>[] = [];
        for (let card of cards) {
            let found: boolean = false;
            for (let i = 0; i < cardStacks.length; i++) {
                if (cardStacks[i].getItem().cardid === card.cardid) {
                    cardStacks[i] = new ItemStack(cardStacks[i].getItem(), cardStacks[i].getAmount() + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                cardStacks.push(new ItemStack(card, 1));
            }
        }
        return cardStacks;
    }

    constructor(client: IClient, userCards:IUserCardsManager) {
        this._client = client;
        this._userCards = userCards;
        this._rules = DeckValidator.getRules(this._client);
        this.issues = [];
        this._ownedCards = this.getCards()
    }

    refresh(): void {
        this._ownedCards = this.getCards();
    }

    public async validate(cards: ICard[]): Promise<IDeckValidity> {
        this.issues = [];
        await this.checkTotalCards(cards);
        await this.checkItemCount(cards);
        await this.checkRarity(cards);
        await this.checkOwnership(cards);
        return new DeckValidity(this.issues.length === 0, this.issues);
    }

    /**
     * check that the amount of cards of rarities are within the rules
     * @param cards deck to validate
     */
    private async checkItemCount(cards: ICard[]): Promise<void> {
        let item: number = 0;
        for (let card of cards) {
            if (card instanceof CardItem) {
                item++;
            }
        }
        if (item > (await this._rules).limit_item) {
            this.issues.push(DeckIssues.STR_LIMIT_ITEM.replace("%d", (await this._rules).limit_item.toString()).replace("%d", item.toString()));
        }
    }

    /**
     * check that the amount of cards of rarities are within the rules
     * @param cards deck to validate
     */
    private async checkRarity(cards: ICard[]): Promise<void> {
        let counts: number[] = new Array(Object.keys(CardRarity).length).fill(0);
        for (let card of cards) {
            counts[card.rarity]++;
        }
        if (counts[CardRarity.LEGENDARY] > (await this._rules).limit_legend) {
            this.issues.push(DeckIssues.STR_LIMIT_LEGEND.replace("%d", (await this._rules).limit_legend.toString()).replace("%d", counts[CardRarity.LEGENDARY].toString()));
        }
        if (counts[CardRarity.EPIC] > (await this._rules).limit_epic) {
            this.issues.push(DeckIssues.STR_LIMIT_EPIC.replace("%d", (await this._rules).limit_epic.toString()).replace("%d", counts[CardRarity.EPIC].toString()));
        }
        if (counts[CardRarity.RARE] > (await this._rules).limit_rare) {
            this.issues.push(DeckIssues.STR_LIMIT_RARE.replace("%d", (await this._rules).limit_rare.toString()).replace("%d", counts[CardRarity.RARE].toString()));
        }
    }

    /**
     * check that the total number of cards is within the rules
     * @param cards deck to validate
     */
    private async checkTotalCards(cards: ICard[]): Promise<void> {
        if (cards.length < (await this._rules).min_cards) {
            this.issues.push(DeckIssues.STR_MIN_CARDS.replace("%d", (await this._rules).min_cards.toString()).replace("%d", cards.length.toString()));
        }
        if (cards.length > (await this._rules).max_cards) {
            this.issues.push(DeckIssues.STR_MAX_CARDS.replace("%d", (await this._rules).max_cards.toString()).replace("%d", cards.length.toString()));
        }
    }
    
    /** 
     * check that the user owns the cards in the deck
     * @param cards deck to validate
    */
    private async checkOwnership(cards: ICard[]): Promise<void> {
        let cardsStack: ItemStack<ICard>[] = DeckValidator.countCards(cards);
        cardsStack.filter(await this.filterCards.bind(this));
    }

    /**
     * filter out cards that the user does not own
     * @param card card to check
     */
    private async filterCards(card: IItemStack<ICard>): Promise<boolean> {
        let localOwnedCards = await this._ownedCards;
        for (let i = 0; i < localOwnedCards.length; i++) {
            if (localOwnedCards[i].getItem().cardid === card.getItem().cardid) {
                if (localOwnedCards[i].getAmount() < card.getAmount()) {
                    this.issues.push(DeckIssues.STR_OWNED.replace("%d", localOwnedCards[i].getAmount().toString()).replace("%s", card.getItem().name).replace("%d", card.getAmount().toString()));
                    return true;
                }else{
                    return false;
                }
            }
        }
        this.issues.push(DeckIssues.STR_OWNED.replace("%d", "0").replace("%s", card.getItem().name).replace("%d", card.getAmount().toString()));
        return true;
    }

    public static async getRules(client: IClient): Promise<DeckRules> {
        return await client.rest.get(Routes.Decks.validity());
    }
    
    public async getCards():Promise<IItemStack<ICard>[]> {
        let query:CardQueryBuilder = new CardQueryBuilder()
        query.setOwned()
        return this._userCards.getCards(query.build());       
    }
}