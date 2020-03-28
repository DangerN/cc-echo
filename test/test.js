const should = require('chai').should()
const fileS = require('../util/fileS');

describe("/fit/", function () {
  it('exists', function () {
    fit.should.be.a('string')
  })
  it('is gay', function () {
    fit.should.equal('gay')
  })
})
