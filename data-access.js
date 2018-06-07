const data = require('./data.json')
const fs = require('fs')

function save (data, callback) {

  // DELETING LOCALS W MAP
  data.item.map(item => {
    delete item['_locals']
    return item
  })
  delete data['_locals']

  fs.writeFile('./data.json', JSON.stringify(data, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
      callback()
    })
  }

  module.exports = save