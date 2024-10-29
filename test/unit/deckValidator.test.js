import assert from 'assert'
import * as critter from '../../src/'
import {assertArray} from "@babel/core/lib/config/validation/option-assertions.js";

describe('test deckValidator', () => {
    const commonCard = new critter.CardCritter(1, "name", 1, critter.CardRarity.COMMON, "image", "", 1, 1, [1]);
    const uncommonCard = new critter.CardCritter(1, "name", 1, critter.CardRarity.UNCOMMON, "image", "", 1, 1, [1]);
    const rareCard = new critter.CardCritter(1, "name", 1, critter.CardRarity.RARE, "image", "", 1, 1, [1]);
    const epicCard = new critter.CardCritter(1, "name", 1, critter.CardRarity.EPIC, "image", "", 1, 1, [1]);
    const legendaryCard = new critter.CardCritter(1, "name", 1, critter.CardRarity.LEGENDARY, "image", "", 1, 1, [1]);
    const itemCard = new critter.CardItem(1, "name", 1, critter.CardRarity.COMMON, "image", "", 1);

    it('normal case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, true);
        assertArray(validity.issues, []);
    });

    it('over maximum case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 51; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues[0], ["Too many cards in the deck"]);
    });

    it('under minimum case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 4; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues[0], ["Not enough cards in the deck"]);
    });

    it('item over limit case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 21; i++) {
            deck.push(itemCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues[0], ["Too many items in the deck"]);
    });

    it('legendary card over limit case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 6; i++) {
            deck.push(legendaryCard);
        }
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues[0], ["Too many legendary cards in the deck"]);
    });

    it('epic card over limit case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 11; i++) {
            deck.push(epicCard);
        }
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues[0], ["Too many epic cards in the deck"]);
    });

    it('rare card over limit case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 16; i++) {
            deck.push(rareCard);
        }
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues[0], ["Too many rare cards in the deck"]);
    });

    it('augmented issues case', () => {
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20);
        let deck = [];
        for (let i = 0; i < 6; i++) {
            deck.push(rareCard);
        }
        for (let i = 0; i < 6; i++) {
            deck.push(epicCard);
        }
        for (let i = 0; i < 6; i++) {
            deck.push(legendaryCard);
        }
        for (let i = 0; i < 21; i++) {
            deck.push(itemCard);
        }
        for (let i = 0; i < 14; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
        assertArray(validity.issues, ["Too many rare cards in the deck", "Too many epic cards in the deck", "Too many legendary cards in the deck", "Too many items in the deck"]);
    });
});