import assert from 'assert'
import * as critter from '../../src/'
import {ICard} from "../../src/";


describe('test deckValidator', () => {
    const commonCard = new critter.CardCritter(1, "name", 1, critter.CardRarity.COMMON, "image", "", 1, 1, [1]);
    const uncommonCard = new critter.CardCritter(2, "name", 1, critter.CardRarity.UNCOMMON, "image", "", 1, 1, [1]);
    const rareCard = new critter.CardCritter(3, "name", 1, critter.CardRarity.RARE, "image", "", 1, 1, [1]);
    const epicCard = new critter.CardCritter(4, "name", 1, critter.CardRarity.EPIC, "image", "", 1, 1, [1]);
    const legendaryCard = new critter.CardCritter(5, "name", 1, critter.CardRarity.LEGENDARY, "image", "", 1, 1, [1]);
    const itemCard = new critter.CardItem(6, "name", 1, critter.CardRarity.COMMON, "image", "", 1);

    it('normal case', () => {
        let ownedCards: critter.IItemStack<ICard>[] = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, true);
    });

    it('over maximum case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 51; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('under minimum case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 5));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 4; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('item over limit case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(itemCard, 21));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 21; i++) {
            deck.push(itemCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('legendary card over limit case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        ownedCards.push(new critter.ItemStack(legendaryCard, 6));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 6; i++) {
            deck.push(legendaryCard);
        }
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('epic card over limit case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        ownedCards.push(new critter.ItemStack(epicCard, 11));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 11; i++) {
            deck.push(epicCard);
        }
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('rare card over limit case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        ownedCards.push(new critter.ItemStack(rareCard, 16));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 16; i++) {
            deck.push(rareCard);
        }
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('not owned case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
        let deck = [];
        for (let i = 0; i < 20; i++) {
            deck.push(commonCard);
        }
        for (let i = 0; i < 2; i++) {
            deck.push(legendaryCard);
        }
        let validity = validator.validate(deck);
        assert.equal(validity.isValid, false);
    });

    it('augmented issues case', () => {
        let ownedCards = [];
        ownedCards.push(new critter.ItemStack(commonCard, 20));
        ownedCards.push(new critter.ItemStack(rareCard, 16));
        ownedCards.push(new critter.ItemStack(epicCard, 11));
        ownedCards.push(new critter.ItemStack(legendaryCard, 6));
        ownedCards.push(new critter.ItemStack(itemCard, 21));
        let validator = new critter.DeckValidator(20, 50, 5, 10, 15, 20, ownedCards);
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
    });
});