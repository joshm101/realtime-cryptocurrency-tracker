const passport = require('passport')

const User = require('../models/User')
const ERROR_CODES = require('../enums/ErrorStatusCodes')

/**
 * Very simple email regex as email validation
 * is a contested topic.
 * https://goo.gl/Ym9mgG
 */
const emailRegex = /\S+@\S+\.\S+/

const MINIMUM_PASSWORD_LENGTH = 8

/**
 * Registers a new user to the application
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @return {void}
 */
const registerUser = (req, res) => {
  const { email, password, confirmPassword } = req.body

  // Ensure that an email is provided
  if (!email) {
    res.status(400).send({
      message: 'An email is required.',
      errorCode: ERROR_CODES.USER_REGISTRATION.NO_EMAIL
    })
    return
  }

  // Ensure that passwords match
  if (password !== confirmPassword) {
    res.status(400).send({
      message: 'Password & password confirmation must match.',
      errorCode: ERROR_CODES.USER_REGISTRATION.PASSWORDS_DONT_MATCH
    })
    return
  }

  // Ensure email is valid according to regex
  if (!emailRegex.test(email)) {
    res.status(400).send({
      message: 'A valid email is required.',
      errorCode: ERROR_CODES.USER_REGISTRATION.BAD_EMAIL
    })
    return
  }

  // Ensure user doesn't already exist
  userExists(email).then((doesExist) => {
    if (doesExist) {
      // Email already taken, respond accordingly
      res.status(400).send({
        message: `The email ${email} is already taken.`,
        errorCode: ERROR_CODES.USER_REGISTRATION.EMAIL_TAKEN
      })
      return
    }

    /* User does not already exist, continue registration process */

    // Ensure that a password has been provided (used mainly
    // to provide a more specific error message)
    if (!password) {
      res.status(400).send({
        message: 'A valid password is required.',
        errorCode: ERROR_CODES.USER_REGISTRATION.NO_PASSWORD
      })
      return
    }

    // Ensure that the provided password is required length
    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      res.status(400).send({
        message:
        `Your password must be at least ${MINIMUM_PASSWORD_LENGTH} ` +
        `characters long.`,
        errorCode: ERROR_CODES.USER_REGISTRATION.BAD_PASSWORD
      })
      return
    }

    // Create new user and set password to provided password
    let user = new User({ email })
    user.setPassword(password)

    // Save user and generate + return a JWT
    user.save((error, user) => {
      if (error) {
      // Some DB error occurred while writing the user data.
        res.status(500).send({
          message: 'An unknown error occurred while creating the user.',
          errorCode: ERROR_CODES.USER_REGISTRATION.INTERNAL_ERROR
        })
        return
      }

      // Successful user creation, generate and return a JWT
      // to client
      res.status(200).send({
        token: user.generateJwt()
      })
    })
  }).catch(() => {
    res.status(500).send({
      message: 'An unknown error occured while creating the user.',
      errorCode: ERROR_CODES.USER_REGISTRATION.INTERNAL_ERROR
    })
  })
}

/**
 * Returns a boolean wrapped in a Promise
 * indicating whether or not a user already
 * exists with the provided email.
 * @param {string} email - Email to query users
 * collection with
 * @return {Promise<boolean>} - Whether or not a
 * user with the provided email exists
 */
const userExists = (email) => {
  return User.findOne(
    { email }
  ).then(user => !!user)
}

/**
 * Login a user via passport.authenticate method
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @return {void}
 */
const login = (req, res) => {
  passport.authenticate('local', (error, user, info) => {
    let token

    // Passport throws an error
    if (error) {
      res.status(500).json(error)
      return
    }

    // User is found
    if (user) {
      token = user.generateJwt()
      res.status(200).json({
        token
      })
    } else {
      // User is not found
      res.status(401).send({
        ...info,
        errorCode: ERROR_CODES.USER_LOGIN.BAD_CREDENTIALS
      })
    }
  })(req, res)
}

/**
 * Retrieves a user whose ID matches the
 * provided ID
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const getUserById = (req, res) => {
  if (!req.params.id) {
    // Bad request to not provide an ID, this request
    // should not be repeated without modification
    res.status(400).send({
      message: 'No ID was specified.'
    })
  }

  User.findById(req.params.id).then(user => {
    if (user) {
      // User found, return it in response
      res.status(200).json({
        user
      })
      return
    }

    res.status(404).send({
      message: 'No user was found with the provided ID.'
    })
  }).catch(error => {
    const { message } = error
    res.status(500).send({
      message
    })
  })
}

module.exports.registerUser = registerUser
module.exports.login = login
module.exports.getUserById = getUserById
