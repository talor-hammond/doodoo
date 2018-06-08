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

function pushRandomItem(arr) {
  var randomIndex = Math.round(Math.random() * arr.length)
  var randomObject = {
    id: data.item.length + 1,
    title: arr[randomIndex],
    isDone: false
  }

  data.item.push(randomObject)
}

// ROUTES:
server.get('/', function (req, res) {

  res.redirect('/app')

})

server.get('/app', function (req, res) {

  res.render('index', data)

})

// CLICKING THE CHECKBOX
server.post('/check', function (req, res) {
  
var idOfItem = Object.keys(req.body) // grabbing the id of the item selected...

var newArray = data.item.filter(x => x.id != idOfItem) // creating a new array without the filtered item...

data.item = newArray // assigning the new array to the item property of the data object

// console.log(data)

save(data, () => { // wrting local data to global data...
   res.redirect('/app')
 })

})

// ADDING AN ITEM
server.post('/app', function (req, res) {

  var newItem = { // creating a new item with the properties required.
    id: data.item.length + 1,
    title: req.body.title,
    isDone: false
  }

  data.item.push(newItem) // pushing newItem object to our item array.

  save(data, () => {
    if (Math.random() > .50) pushRandomItem(randomItems)

    res.redirect('/app') // providing a redirect as a callback when the saving of the data is done.
  })

})

var randomItems = ['milk', 'more milk', 'soy milk', 'chocolate milk', 'lil garlic' 'caviar', 'drugs','shoebox','special pendant', 'amulet of glory', 'crystal skull', 'more drugs']


// EXPORTS:
module.exports = server