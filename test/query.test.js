import assert from 'assert'
import * as critter from "../src"

describe('test query', () => {
    it('should give correct simple query', () => {
        let builder =  new critter.CardQueryBuilder();
        builder.setOwned()
        builder.setOrder(critter.CardOrder.NAME)
        assert.equal(`order=${critter.CardOrder.NAME}&owned=true`,builder.build().getQueryString())
    });

    it('should give correct complex query', () => {
        let builder =  new critter.CardQueryBuilder();
        builder.setCost(10);
        builder.setOwned();
        builder.setIds([1,2,3]);
        builder.setOrder(critter.CardOrder.NAME);
        builder.setOwned();
        builder.setRarities([1,2])
        builder.setRaritiesInclude()
        let expected = `cost=10&ids=1,2,3&order=${critter.CardOrder.NAME}&owned=true&rarities=1,2&raritiesInclude=true`;// there must be a better way to test this
        assert.equal(builder.build().getQueryString(), expected);
    });
});