const express = require('express')
const fs = require('fs')

const app = express()
const port = 3001


app.get('/thumb/:fileID', (req, res) => {
  console.log(res);
  res.send('okie')
})


app.get('/media/:fileID', (req, res) => {
  res.sendFile(__dirname + `/media/${req.params.fileID}/${req.params.fileID}`)
})

app.post('/media', (req, res) => {

})

app.get('*', (req, res) => {
  res.send('go away')
})

app.listen(port, console.log(`Good Luck from port ${3001}!`))
