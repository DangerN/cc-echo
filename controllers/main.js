const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path');
const fileS = require('../util/fileS');


router.use(bodyParser.raw({type: 'application/octet-stream', limit: '4mb'}))

// check to see if file is available and send file or 404
router.get('/media/:fileID', (req, res) => {
  fileS.checkPath(req.params.fileID)
    .then((dirRes) => {
      res.sendFile(`${dirRes.path}/${dirRes.files[1]}`)
    })
    .catch((err) => {
      console.log(err);
      res.send(404)
    })
})

// check to see if file is available and send thumb or 404
router.get('/thumb/:fileID', (req, res) => {
  fs.readdir(path.dirname(__dirname) + `/media/${req.params.fileID}/`, (err, file) => {
    err ? res.send('404') : res.sendFile(path.dirname(__dirname) + `/media/${req.params.fileID}/${file[0]}`)
  })
})


// create thumbnail and save to meida folder then respond with status
router.post('/media', (req, res) => {
  let name = req.get('File-Name')
  let ext = req.get('File-Extension')
  let buffer = Buffer.from(req.body)
  console.log(req.body);

  fs.mkdir(path.dirname(__dirname) + `/media/${name}/`, (err) => {
    err && util.handleErr(err)

    fs.writeFile(path.dirname(__dirname) + `/media/${name}/${name}.${ext}`, buffer, (err) => {
      err && util.handleErr(err)

      imageThumbnail(buffer, {height: 128, width: 128})
      .then(thumb=>{
        fs.writeFile(path.dirname(__dirname) + `/media/${name}/${name}-thumb.${ext}`, thumb, (err) => {
          err && util.handleErr(err)
        })
      })
      .catch(err=>console.log(err))
      res.send('seems ok')
    })

  })
})

router.get('*', (req, res) => {
  res.send('go away')
})

module.exports = router
