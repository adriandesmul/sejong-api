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

    var user1 = {
      user_id: 1,
      username: "test1",
      email: "test1@gmail.com",
      personal_first_name: "Jar Jar",
      personal_last_name: "Binks",
      demo_status: 1,
      sijo_status: 1,
      essay_status: 1
    }

    var user2 = {
      user_id: 2,
      username: "test2",
      email: "test2@gmail.com",
      personal_first_name: "Luke",
      personal_last_name: "Skywalker",
      demo_status: 1,
      sijo_status: 0,
      essay_status: 1
    }

    var users = [user1, user2]

    it('should return all users with their names', function(done) {
        request.get('/admin/users')
          .set('Authorization', 'Bearer ' + adminToken)
          .expect(200, users)
          .end(done)
    })

    it('should return all users with their status for this year', function(done) {
      request.get('/admin/users')
        .set('Authorization', 'Bearer ' + adminToken)
        .expect(200, users)
        .end(done)

    })

    it('should block non-admin users', function(done) {
      request.get('/admin/users')
        .set('Authorization', 'Bearer ' + userToken)
        .expect(401)
        .end(done)
    })
  })
})
