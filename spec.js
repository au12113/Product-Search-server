var supertest = require('supertest')
var { performance } = require('perf_hooks')
var fs = require('fs')

describe('loading express', () => {
  var server;
  beforeEach(() => {
    server = require('./server')
    request = supertest(server)
  })
  // afterEach((done) => {
  //   server.close(done)
  // })
  it('npddb products', () => {
    request
      .get('/npddb/products')
      .expect(200)
  })
  it('dash', () => {
    request
      .get('/')
      .expect(200)
  })
})
