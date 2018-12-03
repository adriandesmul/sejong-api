const request = require('supertest')('http://localhost:3000')
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRyaWFuZGVzbXVsIiwiZW1haWwiOiJhZHJpYW5kZXNtdWxAZ21haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDMxNTQ0ODd9.GFRUgs7-BDY6jMehAFeNEmBf5nC6VKjYGm-cIvEnHP8"

describe('User route', function() {
  describe('CREATE', function() {
    it('should not accept an entry without an alpha user', function(done) {
      request.post('/user/new')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: "test$",
          email: "test@gmail.com",
          password: "test123"
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(422, "Username not alphanumeric")
        .end(done)
    })

    it('should not accept an entry with a short username', function(done) {
      request.post('/user/new')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: "te",
          email: "test@gmail.com",
          password: "test123"
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(422, "Username too short")
        .end(done)
    })

    it('should not accept an entry without a proper email', function(done) {
      request.post('/user/new')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: "test",
          email: "test@gmailcom",
          password: "test123"
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(422, "Email not valid")
        .end(done)
    })

    it('should not accept an entry with a short password', function(done) {
      request.post('/user/new')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: "test",
          email: "test@gmail.com",
          password: "test123"
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(422, "Password too short")
        .end(done)
    })

    it('should accept a properly formatted entry', function(done) {
      request.post('/user/new')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: "test",
          email: "test@gmail.com",
          password: "test12345"
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(200)
        .end(done)
    })
  });

  describe('UPDATE', function() {
    it('should fail if the password is too short', function(done) {
      request.post('/user/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send({
          password: 'test123'
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(422, "Password too short")
        .end(done)
    })

    it('should work if the password is long enough', function(done) {
      request.post('/user/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send({
          password: 'test12345'
        })
        .expect((res) => {
          res.body = res.error.text;
        })
        .expect(200)
        .end(done)
    })
  });
})
