const express = require('express')
const server = express()

// .USE / STATIC FUNCTIONS

// ROUTES:
server.get('/', function(req, res) {

  res.send('<h1>Hello</h1>')

})

// EXPORTS:
module.exports = server