const fs = require('fs')
const path = require('path');

exports.checkPath = async function (fileID) {
  return new Promise((res, rej) => {
    fs.readdir(path.dirname(__dirname) + `/media/${fileID}/`, (err, files) => {
      if (err) rej(err)
      res({path: path.dirname(__dirname) + `/media/${fileID}/`, files: files})
    })
  })
};
