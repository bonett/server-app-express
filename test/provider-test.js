const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const provider = require('../controllers/provider');


describe("Testing GET /api/providers index", function() {
    describe("Check service", function() {
        it("Should be return data", function() {
            result = provider.index;
            assert.isOk(result);
        })
    }) 
});