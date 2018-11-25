const request = require('supertest')('http://localhost:3000')
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDMxNjkzMTl9.LROnrelG5tba5HqS5SKiEORxCiwjfPWtJkge0cKnmhI";
const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmxhbmsiLCJlbWFpbCI6ImJsYW5rQGdtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTQzMTU2MDUxfQ.f7KmIPajA7DVBo1QKBAMOKa2zSa2q9dYFAM1p-Ka0H4";

describe('Admin routes', function() {
  describe('SPOOF', function() {
    it('should allow an admin user to receive a token for another user', function(done) {
      request.post('/admin/spoof')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + adminToken)
        .send({
          username: 'test'
        })
        .expect(200)
        .expect('Content-Length', '176')
        .end(done)
    })

    it('should fail without a username', function(done) {
      request.post('/admin/spoof')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + adminToken)
        .expect(400)
        .end(done)
    })

    it('should block non-admin users', function(done) {
      request.post('/admin/spoof')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + userToken)
        .send({
          username: 'test'
        })
        .expect(401)
        .end(done)
    })
  })

  describe('ANALYTICS', function() {
    xit('should return key data points on the roster', function(done) {

    })

    xit('should block non-admin users', function(done) {

    })
  })

  describe('ROSTER', function() {
    xit('should return all users with their status for this year', function(done) {

    })

    xit('should block non-admin users', function(done) {

    })
  })
})
