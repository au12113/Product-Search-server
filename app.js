var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app.use(bodyParser.json())

const PORT = 3000

mongoose.connect('mongodb://localhost/bookstore')

const Genre = require('./models/genre')

app.get('/', function(req, res) {
  res.send('Please use /api/books or /api/genres')
})

app.get('/api/genres', function(req, res) {
  Genre.getGenres(function(err, genres) {
    if (err) {
      throw err
    }
    res.json(genres)
  })
})

app.listen(PORT, '0.0.0.0')
console.log('Running on port 3000.')
