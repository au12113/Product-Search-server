var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/bookstore'

mongoose.connect(MONGODB_URI)

const Genre = require('./models/genre').Genre

app.get('/', function(req, res) {
  res.send('Please use /api/books or /api/genres')
})

app.get('/api/books', (req, res) => {
  res.json([])
})

app.get('/api/books/:id', (req, res) => {
  res.json({ id: req.params.id })
})

app.get('/api/genres', function(req, res) {
  Genre.find().exec((err, genres) => {
    res.json(genres)
  })
//   Genre.getGenres(function(err, genres) {
//     if (err) {
//       throw err
//     }
//     res.json(genres)
//   })
})

app.post('/api/genres', (req, res) => {
  const genre = new Genre(req.body)
  genre.save((err) => {
    res.sendStatus(201)
  })
})

app.listen(PORT, '0.0.0.0')
console.log(`Running on port ${PORT}`)
