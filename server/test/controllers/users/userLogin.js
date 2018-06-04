process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../../../models/User')
const server = require('../../../bin/www')
const createUser = require('./utils/createUser')
const ERROR_CODES = require('../../../enums/ErrorStatusCodes')

chai.use(chaiHttp)
const expect = chai.expect

describe('User login', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done()
    })
  })

  it('should log a user in', (done) => {
    createUser().then(res =>
      chai.request(server)
        .post('/api/users/login')
        .send({
          'email': 'test@test.com',
          password: 'password'
        })
    ).then((res) => {
      expect(res).to.have.status(200)
      expect(res.body).to.be.a('object')
      expect(res.body).to.have.property('token')
      done()
    })
  })

  it('should throw an error when the user does not exist', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .send({
        email: 'some_email@email.com',
        password: 'password'
      })
      .then((res) => {
        expect(res).to.have.status(401)
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.have.property('errorCode')
        expect(res.body.errorCode).to.equal(
          ERROR_CODES.USER_LOGIN.BAD_CREDENTIALS
        )
        done()
      })
  })

  it('should fail when an invalid password is provided', (done) => {
    createUser().then(res =>
      chai.request(server)
        .post('/api/users/login')
        .send({
          email: 'test@test.com',
          password: 'password123'
        })
    ).then((res) => {
      expect(res).to.have.status(401)
      expect(res.body).to.have.property('message')
      expect(res.body.message).to.be.a('string')
      expect(res.body).to.have.property('errorCode')
      expect(res.body.errorCode).to.equal(
        ERROR_CODES.USER_LOGIN.BAD_CREDENTIALS
      )
      done()
    })
  })
})
