import { IDeck, IDeckValidator, IDeckValidity, } from "../index";
import { DeckRules, DeckIssue } from "../rest/payloads";

export class DeckValidator implements IDeckValidator {
    private readonly min_cards: number;
    private readonly max_cards: number;
    private readonly limit_legend: number;
    private readonly limit_epic: number;
    private readonly limit_rare: number;
    private readonly limit_item: number;

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
        this.min_cards = min_cards;
        this.max_cards = max_cards;
        this.limit_legend = limit_legend;
        this.limit_epic = limit_epic;
        this.limit_rare = limit_rare;
        this.limit_item = limit_item;
    }

    validate(deck: IDeck): IDeckValidity {
        throw new Error("Method not implemented.");
    }
    
}