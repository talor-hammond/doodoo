const express = require('express')
const server = express()
const hbs = require('express-handlebars')

const fs = require('fs')

const data = require('./data.json') // DATA OBJECT
const save = require('./data-access')


// Middleware
server.engine('hbs', hbs({
  defaultLayout: 'index',
  extname: 'hbs'
}))

server.set('view engine', 'hbs')
server.use(express.static('public'))
server.use(express.urlencoded({extended: false}))

// FUNCTIONS:


  // data.item[id] 

function isDone() {

 console.log("click")
//   for (var i = 0; i < data.item.length; i++) {



//   }

}
// ROUTES:
server.get('/', function (req, res) {

  res.redirect('/app')

})

server.get('/app', function (req, res) {

  res.render('index', data)

})

server.post('/app', function (req, res) {

  console.log(req.body.title)
  var newItem = {
    id: data.item.length,
    title: req.body.title,
    isDone: false
  }

  data.item.push(newItem)

  save(data, ()=> {
    res.redirect('/app')
  })

})

// EXPORTS:
module.exports = server