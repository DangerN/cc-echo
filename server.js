const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
const port = 3001

app.use(bodyParser.raw({type: 'application/octet-stream', limit: '4mb'}))

// check to see if file is available and send file or 404
app.get('/media/:fileID', (req, res) => {
  fs.readdir(__dirname + `/media/${req.params.fileID}/`, (err, file) => {
    err ? res.send('404') : res.sendFile(__dirname + `/media/${req.params.fileID}/${file[0]}`)
  })
})

// check to see if file is available and send thumb or 404
app.get('/thumb/:fileID', (req, res) => {
  fs.readdir(__dirname + `/media/${req.params.fileID}/`, (err, file) => {
    err ? res.send('404') : res.sendFile(__dirname + `/media/${req.params.fileID}/${file[1]}`)
  })
})

// create thumbnail and save to meida folder then respond with status
// TODO:
app.post('/media', (req, res) => {
  let name = req.get('File-Name')
  let ext = req.get('File-Extension')
  let buffer = Buffer.from(req.body)
  fs.mkdir(__dirname + `/media/${name}/`, (err) => {
    if (err) { throw err }
    fs.writeFile(__dirname + `/media/${name}/${name}.${ext}`, buffer, (err) => {
      err ? res.send('no dice') : res.send('seems ok')
    })
  })
})

app.get('*', (req, res) => {
  res.send('go away')
})

app.listen(port, console.log(`Good Luck from port ${3001}!`))
