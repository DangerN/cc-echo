const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// const fs = require('fs')
// const path = require('path');
const fileS = require('../util/fileS');


router.use(bodyParser.raw({type: 'application/octet-stream', limit: '4mb'}))

// check to see if file is available and send file or 404
router.get('/media/:fileID', (req, res) => {
  fileS.checkPath(req.params.fileID)
  .then(dirRes => res.sendFile(`${dirRes.path}/${dirRes.files[1]}`))
  .catch(err => res.send(404))
})

// check to see if file is available and send thumb or 404
router.get('/thumb/:fileID', (req, res) => {
  fileS.checkPath(req.params.fileID)
  .then(dirRes => res.sendFile(`${dirRes.path}/${dirRes.files[0]}`))
  .catch(err => res.sendStatus(404))
})

// create thumbnail and save to meida folder then respond with status
router.post('/media', (req, res) => {
  fileS.newImage(req.get('File-Name'), req.get('File-Extension'), Buffer.from(req.body))
  .then(() => res.send('seems ok'))
  .catch(err => {
    console.error(err)
    res.sendStatus(500)
  })
})

router.get('*', (req, res) => {
  res.send('go away')
})

module.exports = router
