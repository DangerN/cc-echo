const express = require('express')
const fs = require('fs')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('go away')
})

app.get('/thumb', (req, res) => {
  res.send('benis')
})

app.get('/media/', (req, res) => {

})

app.post('/media', (req, res) => {

})


app.listen(port, console.log(`Good Luck from port ${3001}!`))
