import { CardItem, CardRarity, DeckValidity, ICard, ICardsManager, IDeck, IDeckValidator, IDeckValidity, } from "../index";
import { DeckRules, DeckIssue } from "../rest/payloads";

export class DeckValidator implements IDeckValidator {
    private readonly _min_cards: number;
    private readonly _max_cards: number;
    private readonly _limit_legend: number;
    private readonly _limit_epic: number;
    private readonly _limit_rare: number;
    private readonly _limit_item: number;
    private issues: Array<string>;

    public static fromDeckRules(rules: DeckRules): DeckValidator {
        return new DeckValidator(rules.min_cards, 
                                 rules.max_cards, 
                                 rules.limit_legend, 
                                 rules.limit_epic, 
                                 rules.limit_rare,
                                 rules.limit_item
        );
    }

    constructor(min_cards: number, max_cards: number, limit_legend: number, limit_epic: number, limit_rare: number, limit_item: number) {
        this._min_cards = min_cards;
        this._max_cards = max_cards;
        this._limit_legend = limit_legend;
        this._limit_epic = limit_epic;
        this._limit_rare = limit_rare;
        this._limit_item = limit_item;
        this.issues = [];
    }

    public validate(cards: ICard[]): IDeckValidity {
        this.issues = [];
        this.checkTotalCards(cards);
        this.checkItemCount(cards);
        this.checkRarity(cards);
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
    
}