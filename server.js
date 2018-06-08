const express = require('express')
const server = express()
const hbs = require('express-handlebars')

const fs = require('fs')

const data = require('./data.json') // DATA OBJECT
const save = require('./data-access')

// Global Variables:
var count = 0;

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

count++ // iterating the count when checkbox is clicked
if (count == 3) data.item.map (x => x.title = "milk") // ??????????
if (count == 4) data.item.map (x => x.title = "please get milk")
if (count == 5) {
  data.item.map (x => x.title = "please send help")
  count = 0 // resetting counter.
} 

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
    if (Math.random() > .20) pushRandomItem(randomItems)

    res.redirect('/app') // providing a redirect as a callback when the saving of the data is done.
  })

})

var randomItems = ['milk!!!', 'more milk??', 'soy milk /:', 'Potato', 'Brotato', 'Badtato', 'chocolate milk', 'lil garlic', 'caviar', 'drugs??','shoebox???','special pendant', 'amulet of glory', 'crystal skull', 'more drugs', 'skeleton key', 'wearable arts', 'centipede', 'small puppy', 'minotaur', 'wax idol', 'bronze einstein statue','cyan','ironman', 'wavy:cyan:selingcoal100gp!!', 'im stuck in a div prison', 'please thank you', 'bear claw', 'golden teardrop', 'ultimate teardrop', 'mulch', 'bad tattoo', 'lamborfini', 'coiled gut worm' ]


// EXPORTS:
module.exports = server