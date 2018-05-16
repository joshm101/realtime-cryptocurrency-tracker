const express = require('express')
const users = express.Router()

const usersController = require('../../controllers/users')

/* GET users listing. */
users.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

users.post('/register', usersController.registerUser)
users.post('/login', usersController.login)

module.exports = users
