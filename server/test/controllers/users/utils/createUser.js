const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../../../../bin/www')

chai.use(chaiHttp)

const createUser = () => (
  chai.request(server)
    .post('/api/users/register')
    .send({
      email: 'test@test.com',
      password: 'password',
      confirmPassword: 'password'
    })
)

module.exports = createUser
