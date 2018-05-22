process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const jwtDecode = require('jwt-decode')

const User = require('../../../models/User')
const server = require('../../../bin/www')

chai.use(chaiHttp)
const expect = chai.expect

let id

describe('User retrieval', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done()
    })
  })

  it('should get a user by ID', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password'
      })
      .then(res => {
        const { token } = res.body
        const { _id } = jwtDecode(token)
        id = _id
        return chai.request(server)
          .get(`/api/users/${_id}`)
          .set('Authorization', `Bearer ${token}`)
      }).then(res => {
        expect(res).to.have.status(200)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('user')
        expect(res.body.user._id).to.equal(id)
        done()
      })
  })

  it('should fail when no user matches the provided ID', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password'
      })
      .then(res => {
        const { token } = res.body
        const { _id } = jwtDecode(token)
        id = _id
        return chai.request(server)
          .get(`/api/users/5b0391d1757a4020e0b49410`)
          .set('Authorization', `Bearer ${token}`)
      })
      .then(res => {
        expect(res).to.have.status(404)
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.be.a('string')
        done()
      })
  })

  it('should fail when the requester is not signed in', (done) => {
    chai.request(server)
      .get('/api/users/5b0391d1757a4020e0b49410')
      .then(res => {
        expect(res).to.have.status(401)
        done()
      })
  })
})
