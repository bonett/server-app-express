const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const specialty = require('../controllers/specialty');


describe("Testing GET /api/specialtities index", function() {
    describe("Check service", function() {
        it("Should be return data", function() {
            result = specialty.index;
            assert.isOk(result);
        })
    }) 
});