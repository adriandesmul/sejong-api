const request = require('supertest')('http://localhost:3000')

describe('Auth route', function() {

  describe('LOGIN', function() {
    it('should error when credentials are not sent', function(done) {
      request.post('/auth/login').expect(400).end(done)
    });

    it('should accept valid credentials', function(done) {
      request.post('/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'test',
          password: 'test123'
        })
        .expect(200)
        .expect('Content-Length', '143')
        .end(done)
    });

    it('should fail with invalid credentials', function(done) {
      request.post('/auth/login')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'test',
          password: 'test124'
        })
        .expect(401)
        .end(done)
    });
  });

  describe('FORGOT PASSWORD', function() {
    it('should accept an email and username for forgotten passwords', function(done) {
      request.post('/auth/forgotPassword')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'test',
          email: 'test@gmail.com'
        })
        .expect(200)
        .end(done)
    });

    xit('should do nothing if the email does not match', function(done) {
      done()
    });
  });
})
