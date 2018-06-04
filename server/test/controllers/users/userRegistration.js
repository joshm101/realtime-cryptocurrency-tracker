process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../../../models/User')
const server = require('../../../bin/www')
const ERROR_CODES = require('../../../enums/ErrorStatusCodes')

chai.use(chaiHttp)
const expect = chai.expect

describe('User registration', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done()
    })
  })

  it('should register a user', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: 'abc123456789',
        confirmPassword: 'abc123456789'
      })
      .end((_, res) => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('token')
        done()
      })
  })

  it('should fail when passwords do not match', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: 'abc1234567',
        confirmPassword: 'abc1234568'
      })
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.have.property('errorCode')
        expect(res.body.errorCode).to.equal(
          ERROR_CODES.USER_REGISTRATION.PASSWORDS_DONT_MATCH
        )
        done()
      })
  })

  it('should fail when a password is not provided', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com'
      })
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.have.property('errorCode')
        expect(res.body.errorCode).to.equal(
          ERROR_CODES.USER_REGISTRATION.NO_PASSWORD
        )
        done()
      })
  })

  it('should fail when a password does not meet length requirements', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: 'abc123',
        confirmPassword: 'abc123'
      })
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.have.property('errorCode')
        expect(res.body.errorCode).to.equal(
          ERROR_CODES.USER_REGISTRATION.BAD_PASSWORD
        )
        done()
      })
  })

  it('should fail when a malformed email is provided', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test',
        password: 'abc1234567',
        confirmPassword: 'abc1234567'
      })
      .end((_, res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.have.property('errorCode')
        expect(res.body.errorCode).to.equal(
          ERROR_CODES.USER_REGISTRATION.BAD_EMAIL
        )
        done()
      })
  })

  it('should fail when a user with the provided email already exists', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: 'abc1234567',
        confirmPassword: 'abc1234567'
      })
      .then(res =>
        chai.request(server)
          .post('/api/users/register')
          .send({
            email: 'test@test.com',
            password: 'abc1234567',
            confirmPassword: 'abc1234567'
          })
      ).then((res) => {
        expect(res).to.have.status(400)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.have.property('errorCode')
        expect(res.body.errorCode).to.equal(
          ERROR_CODES.USER_REGISTRATION.EMAIL_TAKEN
        )
        done()
      })
  })
})
