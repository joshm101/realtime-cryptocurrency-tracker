const express = require('express')
const users = express.Router()

const usersController = require('../../controllers/users')
const auth = require('../config/auth')

/* GET users listing. */
users.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

users.post('/register', usersController.registerUser)
users.post('/login', usersController.login)
users.get('/:id', auth, usersController.getUserById)

module.exports = users
