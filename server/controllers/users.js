const User = require('../models/User')

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
      message: 'An email is required.'
    })
    return
  }

  // Ensure that passwords match
  if (password !== confirmPassword) {
    res.status(400).send({
      message: 'Password & password confirmation must match.'
    })
    return
  }

  // Ensure user doesn't already exist
  userExists(email).then((doesExist) => {
    if (doesExist) {
      // Email already taken, respond accordingly
      res.status(400).send({
        message: `The email ${email} is already taken.`
      })
      return
    }

    /* User does not already exist, continue registration process */

    // Ensure email is valid according to regex
    if (!email && !emailRegex.test(email)) {
      res.status(400).send({
        message: 'A valid email is required.'
      })
      return
    }

    // Ensure that a password has been provided (used mainly
    // to provide a more specific error message)
    if (!password) {
      res.status(400).send({
        message: 'A valid password is required.'
      })
      return
    }

    // Ensure that the provided password is required length
    if (password.length < MINIMUM_PASSWORD_LENGTH) {
      res.status(400).send({ message:
        `Your password must be at least ${MINIMUM_PASSWORD_LENGTH} ` +
        `characters long.`
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
          message: 'An unknown error occurred while creating the user.'
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
      message: 'An unknown error occured while creating the user.'
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

module.exports.registerUser = registerUser
