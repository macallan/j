require('dotenv').config()
const http = require('http')
const express = require('express')
const route = require('./routes')

const app = express()
const port = process.env['PORT'] || 3000

app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use('/', route)
app.use((req, res, next) => {
  res.status(404).send('<h1> Page not found <h1>')
})

const server = http.createServer(app)
console.log('port', port)
server.listen(port)
