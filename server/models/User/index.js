const crypto = require('crypto')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const RCT_SECRET = process.env.RCT_SECRET || 'SET_SECRET_FOR_PRODUCTION'

const schema = new mongoose.Schema({
  email: String,
  hash: String,
  salt: String
})

/**
 * Instance methods do NOT have access to "this" context as
 * ES6 arrow functions, so ES5 syntax is used instead.
 * See bullet points at the bottom of the linked Mongoose
 * docs section: https://goo.gl/8ZMo7d
 */

/**
 * Sets current user instance's (this) stored
 * password hash
 * @param {string} password - Password to hash and set
 * @return {void}
 */
schema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex')
}

/**
 * Checks if the hash of the provided password
 * matches the current user instance's (this)
 * stored hash.
 * @param {string} password - Password to hash and check
 * @return {boolean} - True if hash of password matches,
 * false otherwise
 */
schema.methods.validPassword = function(password) {
  return crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex') === this.hash
}

/**
 * Generates a JWT using the current' user instance's
 * (this) information.
 * @return {void}
 */
schema.methods.generateJwt = function() {
  // expiration date is 3 hours from now
  const expiry = moment().add(3, 'hours').toDate()
  return jwt.sign({
    _id: this._id,
    exp: parseInt(expiry.getTime() / 1000)
  }, RCT_SECRET)
}

module.exports = mongoose.model('User', schema)
