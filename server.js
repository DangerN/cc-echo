const express = require('express')
const fs = require('fs')

const app = express()
const port = 3001

// checks to see if file is available and file type, send it if it is or return a 404 if not
app.get('/media/:fileID', (req, res) => {
  fs.readdir(`/media/${req.params.fileID}/`, (err, file) => {
    console.log(err);
    console.log(file);
    res.sendFile(__dirname + `/media/${req.params.fileID}/${req.params.fileID}`)
  })
})

// check to see if thumb is available, send it if so
// no need to check file extension, all thumbs are .jpg
app.get('/thumb/:fileID', (req, res) => {
  console.log(res);
  res.send('okie')
})


app.post('/media', (req, res) => {

})

app.get('*', (req, res) => {
  res.send('go away')
})

app.listen(port, console.log(`Good Luck from port ${3001}!`))
