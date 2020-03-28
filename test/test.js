const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
const fs = require('fs');
const path = require('path');

chai.use(chaiAsPromised)
chai.should()

const fileS = require('../util/fileS');

describe("fileS", function () {
  describe("#checkPath", function () {
    before(function () {
      fs.mkdirSync(path.dirname(__dirname) + '/media/test/', {recursive: true})
      fs.writeFileSync(path.dirname(__dirname) + '/media/test/test.jpg', 'test')
    })

    after(function () {
      fs.unlinkSync(path.dirname(__dirname) + '/media/test/test.jpg')
      fs.rmdirSync(path.dirname(__dirname) + '/media/test/')
    })

    it('returns path and files if available', function () {
      return fileS.checkPath('test').should.be.fulfilled
    })

    it('throws error if path does not exist', function () {
      return fileS.checkPath('badTest').should.be.rejectedWith(Error)
    })
  })
})
