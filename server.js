const express = require('express')
const fs = require('fs')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('go away')
})

app.get('/thumb/:fileID', (req, res) => {
  
})

app.get('/media/:fileID', (req, res) => {

})

app.post('/media', (req, res) => {

})


app.listen(port, console.log(`Good Luck from port ${3001}!`))
