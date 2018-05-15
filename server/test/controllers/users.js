process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const User = require('../../models/User')
const server = require('../../bin/www')

chai.use(chaiHttp)
const expect = chai.expect

describe('users', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done()
    })
  })

  it('should register a user', (done) => {
    chai.request(server)
      .post('/api/users')
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
      .post('/api/users')
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
        done()
      })
  })
})
