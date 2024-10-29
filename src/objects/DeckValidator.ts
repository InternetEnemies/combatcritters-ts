import { CardItem, CardQuery, CardRarity, DeckValidity, ICard, ICardsManager, IDeck, IDeckValidator, IDeckValidity, IItemStack, ItemStack, UserCardsManager, } from "../index";
import { DeckRules, DeckIssue, CardQuery as CardQueryPayload } from "../rest/payloads";

export class DeckValidator implements IDeckValidator {
    private readonly _min_cards: number;
    private readonly _max_cards: number;
    private readonly _limit_legend: number;
    private readonly _limit_epic: number;
    private readonly _limit_rare: number;
    private readonly _limit_item: number;
    private readonly _ownedCards: IItemStack<ICard>[];
    private issues: Array<string>;

    public static from_DeckRules_UserCards(rules: DeckRules, CardsPayload:CardQueryPayload[]): DeckValidator {
        return new DeckValidator(rules.min_cards, 
                                 rules.max_cards, 
                                 rules.limit_legend, 
                                 rules.limit_epic, 
                                 rules.limit_rare,
                                 rules.limit_item,
                                 CardQuery.fromCardQueryPayloads(CardsPayload)
        );
    }

    public static countCards(cards: ICard[]): ItemStack<ICard>[] {
        let cardStacks: ItemStack<ICard>[] = [];
        for (let card of cards) {
            cardStacks.push(new ItemStack(card, 1));
        }
        return cardStacks;
    }

    constructor(min_cards: number, max_cards: number, limit_legend: number, limit_epic: number, limit_rare: number, limit_item: number, ownedCards: IItemStack<ICard>[]) {
        this._min_cards = min_cards;
        this._max_cards = max_cards;
        this._limit_legend = limit_legend;
        this._limit_epic = limit_epic;
        this._limit_rare = limit_rare;
        this._limit_item = limit_item;
        this._ownedCards = ownedCards;
        this.issues = [];
    }

    public validate(cards: ICard[]): IDeckValidity {
        this.issues = [];
        this.checkTotalCards(cards);
        this.checkItemCount(cards);
        this.checkRarity(cards);
        this.checkOwnership(cards);
        return new DeckValidity(this.issues.length === 0, this.issues);
    }

    /**
     * check that the amount of cards of rarities are within the rules
     * @param cards deck to validate
     */
    private checkItemCount(cards: ICard[]): void {
        let item: number = 0;
        for (let card of cards) {
            if (card instanceof CardItem) {
                item++;
            }
        }
        if (item > this._limit_item) {
            this.issues.push(DeckIssue.STR_LIMIT_ITEM);
        }
    }

    /**
     * check that the amount of cards of rarities are within the rules
     * @param cards deck to validate
     */
    private checkRarity(cards: ICard[]): void {
        let counts: number[] = new Array(Object.keys(CardRarity).length).fill(0);
        for (let card of cards) {
            counts[card.rarity]++;
        }
        if (counts[CardRarity.LEGENDARY] > this._limit_legend) {
            this.issues.push(DeckIssue.STR_LIMIT_LEGEND);
        }
        if (counts[CardRarity.EPIC] > this._limit_epic) {
            this.issues.push(DeckIssue.STR_LIMIT_EPIC);
        }
        if (counts[CardRarity.RARE] > this._limit_rare) {
            this.issues.push(DeckIssue.STR_LIMIT_RARE);
        }
    }

    /**
     * check that the total number of cards is within the rules
     * @param cards deck to validate
     */
    private checkTotalCards(cards: ICard[]): void {
        if (cards.length < this._min_cards) {
            this.issues.push(DeckIssue.STR_MIN_CARDS);
        }
        if (cards.length > this._max_cards) {
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
    private filterCards(card: IItemStack<ICard>): boolean {
        for (let ownedCard of this._ownedCards) {
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
}