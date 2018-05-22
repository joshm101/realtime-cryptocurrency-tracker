const jwt = require('express-jwt')
const RCT_SECRET = process.env.RCT_SECRET || 'SET_SECRET_FOR_PRODUCTION'
const auth = jwt({
  secret: RCT_SECRET
})

module.exports = auth
