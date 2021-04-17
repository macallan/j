const http = require('http')
const path = require('path')
const express = require('express')
const route = require('./routes')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use('/', route)
app.use((req, res, next) => {
  res.status(404).send('<h1> Page not found <h1>')
})

const server = http.createServer(app)
server.listen(3000)
