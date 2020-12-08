const { expect } = require('chai')
const request = require('request')
const server = 'http://localhost:3000' || process.env.PORT

describe('Testing basic request and status codes', function () {
  describe('/', () => {
    it('as an h1 tag send: Here is a list of pictures currently in the database:', function(done) {
      request(server , (error, res, body) => {
          expect(body).to.equal('<h1>Here is a list of pictures currently in the database:</h1>')
          expect(body).to.be.a('string')
          done()
      })
    })
    it('send back a status code of 200', function(done) {
      request(server , (error, res, body) => {
          expect(res.statusCode).to.equal(200)
          done()
      })
    })
  })

  describe('/abs', () => {
    it('as an h1 tag send: Monday: Sit ups', (done) => {
      request(`${server}/abs`, (error, res, body) => {
        expect(body).to.equal(`<h1>Monday: Sit ups</h1>`)
        expect(body).to.be.a('string')
        done()
      })
    })
    it('send back a status code of 200', function(done) {
      request(`${server}/abs` , (error, res, body) => {
          expect(res.statusCode).to.equal(200)
          done()
      })
    })
  })
})