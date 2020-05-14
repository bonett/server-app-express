const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const specialty = require('../controllers/specialty');


describe("Speciality", function() {
    describe("GET /", function() {
        it("Should be return data", function() {
            result = specialty.index;
            assert.isOk(result);
        })
    }) 
});