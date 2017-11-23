var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')

app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://<au12113>:<W45up0nt>@ds115124.mlab.com:15124/heroku_g1mlp3dj' // 'mongodb://localhost/product'

mongoose.connect(MONGODB_URI, {
  user: 'au12113',
  pass: 'W45up0nt'
})

const Products = require('./models/products').Products
const Genre = require('./models/genre').Genre

app.use(cors({ origin: 'http://localhost:8080' }))

app.get('/', function (req, res) {
  res.send('Please use /api/product or /api/products/:find(with find parameter)')
})

app.get('/api/product', (req, res) => {
  Products.find().exec((err, product) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(product)
  })
})

app.listen(PORT, '0.0.0.0')
console.log(`Running on port ${PORT}`)

app.get('/api/books', (req, res) => {
  res.json([])
})

app.get('/api/books/:id', (req, res) => {
  res.json({ id: req.params.id })
})

app.get('/api/genres', function (req, res) {
  Genre.find().exec((err, genres) => {
    if (err) {
      console.log(err)
      return res.sendStatus(500)
    }
    res.jsonp(genres)
  })
})

app.post('/api/add', (req, res) => {
  var genre = new Genre(req.body)
  if (req.body.name === '' || req.body.name === null) {
    return res.send('Please fill todo list.')
  }
  else {
    genre.save(err => {
      if (err) {
        console.error(err)
        return res.sendStatus(500)
      }
      res.sendStatus(201)
    })
  }
})

app.post('/api/done', (req, res) => {
  console.log(req.body)
  Genre.find(req.body).remove().exec()
  res.sendStatus(200)
})
