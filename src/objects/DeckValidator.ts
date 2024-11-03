import {
    CardItem,
    CardQueryBuilder,
    CardRarity,
    DeckValidity,
    ICard,
    IClient,
    IDeckValidator,
    IDeckValidity,
    IItemStack,
    ItemStack, IUser,
    Routes,
} from "../index";
import { DeckRules, DeckIssue, CardQuery as CardQueryPayload } from "../rest/payloads";

export class DeckValidator implements IDeckValidator {
    private _ownedCards!: Promise<IItemStack<ICard>[]>;
    private _rules: Promise<DeckRules>;
    private _client: IClient;
    private _user: IUser;
    private issues: Array<string>;

    public static countCards(cards: ICard[]): ItemStack<ICard>[] {
        let cardStacks: ItemStack<ICard>[] = [];
        for (let card of cards) {
            cardStacks.push(new ItemStack(card, 1));
        }
        return cardStacks;
    }

    constructor(client: IClient, user:IUser) {
        this._client = client;
        this._rules = DeckValidator.getRules(this._client);
        this._ownedCards = this.getCards()
        this.issues = [];
        this._user = user;
    }

    refresh(): void {
        this._ownedCards = this.getCards();
    }

    public async validate(cards: ICard[]): Promise<IDeckValidity> {
        this.issues = [];
        await this.checkTotalCards(cards);
        await this.checkItemCount(cards);
        await this.checkRarity(cards);
        this.checkOwnership(cards);
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
            this.issues.push(DeckIssue.STR_LIMIT_ITEM);
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
            this.issues.push(DeckIssue.STR_LIMIT_LEGEND);
        }
        if (counts[CardRarity.EPIC] > (await this._rules).limit_epic) {
            this.issues.push(DeckIssue.STR_LIMIT_EPIC);
        }
        if (counts[CardRarity.RARE] > (await this._rules).limit_rare) {
            this.issues.push(DeckIssue.STR_LIMIT_RARE);
        }
    }

    /**
     * check that the total number of cards is within the rules
     * @param cards deck to validate
     */
    private async checkTotalCards(cards: ICard[]): Promise<void> {
        if (cards.length < (await this._rules).min_cards) {
            this.issues.push(DeckIssue.STR_MIN_CARDS);
        }
        if (cards.length > (await this._rules).max_cards) {
            this.issues.push(DeckIssue.STR_MAX_CARDS);
        }
    }
    
    /** 
     * check that the user owns the cards in the deck
     * @param cards deck to validate
    */
    private checkOwnership(cards: ICard[]): void {
        let cardsStack: ItemStack<ICard>[] = DeckValidator.countCards(cards);
        let not_owned = cardsStack.filter(this.filterCards.bind(this));
        for (let card of not_owned) {
            this.issues.push(DeckIssue.STR_OWNED.replace("%d", card.getAmount().toString()).replace("%s", card.getItem().name));
        }
    }

    /**
     * filter out cards that the user does not own
     * @param card card to check
     */
    private async filterCards(card: IItemStack<ICard>): Promise<boolean> {
        for (let ownedCard of await this._ownedCards) {
            if (ownedCard.getItem().cardid === card.getItem().cardid) {
                if (ownedCard.getAmount() < card.getAmount()) {
                    return true;
                }else{
                    return false;
                }
            }
        }
        return true;
    }

    public static async getRules(client: IClient): Promise<DeckRules> {
        return await client.rest.get(Routes.Decks.validity());
    }
    
    public async getCards():Promise<IItemStack<ICard>[]> {
        let query:CardQueryBuilder = new CardQueryBuilder()
        query.setOwned()
        return this._user.cards.getCards(query.build());       
    }
}