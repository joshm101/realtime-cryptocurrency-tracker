const express = require('express')
const api = express.Router()

const users = require('./users')

api.get('/', (req, res, next) => {
  res.send('API')
})

api.use('/users', users)

module.exports = api
