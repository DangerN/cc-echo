const fs = require('fs')
const fsp = require('fs').promises
const path = require('path');
const imageThumbnail = require('image-thumbnail')

exports.checkPath = async function (fileID) {
  return new Promise((res, rej) => {
    fs.readdir(path.dirname(__dirname) + `/media/${fileID}/`, (err, files) => {
      err && rej(err)
      res({path: path.dirname(__dirname) + `/media/${fileID}/`, files: files})
    })
  })
};

// data is expected to be a buffer
exports.newImage = async function (name, extension, data) {
  const writePathBase = path.dirname(__dirname) + `/media/`

  return new Promise(function(resolve, reject) {
    fsp.mkdir(writePathBase + `${name}/`)
    .then(()=> {
      console.log('saving file');
      let saveThumb = imageThumbnail(data, {height: 128, width: 128})
      .then(thumb => fsp.writeFile(writePathBase + `${name}/${name}-thumb.${ext}`, thumb))

      let saveFile = fsp.writeFile(writePathBase + `/media/${name}/${name}.${ext}`, buffer)

      resolve(Promise.all(saveFile, saveThumb))
    }).catch(err=>reject(err))
  })
}
