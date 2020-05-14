const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const type = require('../controllers/type');


describe("Testing GET /api/types index", function() {
    describe("Check service", function() {
        it("Should be return data", function() {
            result = type.index;
            assert.isOk(result);
        })
    }) 
});