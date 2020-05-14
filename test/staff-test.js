const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const staff = require('../controllers/staff');


describe("Testing GET /api/staff index", function() {
    describe("Check service", function() {
        it("Should be return data", function() {
            result = staff.index;
            assert.isOk(result);
        })
    }) 
});