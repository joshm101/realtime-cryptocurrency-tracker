/**
 * Referenced https://goo.gl/LMVVLA
 * This module implements the LocalStrategy passport
 * authentication mechanism.
 */

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    (username, password, done) => {
      User.findOne(
        { email: username }
      ).then((user) => {
        if (!user) {
          // User not found in DB
          return done(null, false, {
            message: 'Invalid email and/or password.'
          })
        }

        if (!user.validPassword(password)) {
          // Password is incorrect
          return done(null, false, {
            message: 'Invalid email and/or password.'
          })
        }

        // Credentials are correct, return user object
        return done(null, user)
      }).catch((error) => {
        return done(error)
      })
    }
  )
)
