const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const status = require('../controllers/status');


describe("Testing GET /api/status index", function() {
    describe("Check service", function() {
        it("Should be return data", function() {
            result = status.index;
            assert.isOk(result);
        })
    }) 
});