const request = require('supertest')('http://localhost:3000')
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NDMxNjkzMTl9.LROnrelG5tba5HqS5SKiEORxCiwjfPWtJkge0cKnmhI";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRyaWFuZGVzbXVsIiwiZW1haWwiOiJhZHJpYW5kZXNtdWxAZ21haWwuY29tIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDMxNTQ0ODd9.GFRUgs7-BDY6jMehAFeNEmBf5nC6VKjYGm-cIvEnHP8"

describe('School API', function() {
  describe('CREATE', function() {
    var school;

    beforeEach(() => {
      school = {};
      school.school_name = "Central Elementary School"
      school.school_city = "Wilmette"
      school.school_state = "IL"
      school.school_country = "USA"
      school.school_zip = "60091"
    })

    it('should allow the creation of new schools', function(done) {
      var school_with_id = {};
      for (let key in school) {
        school_with_id[key] = school[key];
      }
      school_with_id.school_id = 5

      request.post('/school/createSchool')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send(school)
        .expect(200, school_with_id)
        .end(done)
    });

    it('should not allow the creation of an incomplete school', function(done) {
      school.school_name = "";
      school.school_city = "";
      request.post('/school/createSchool')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send(school)
        .expect(400, {
          school_name: "Cannot be blank",
          school_city: "Cannot be blank"
        })
        .end(done)
    });

    xit('should not allow the creation of duplicate schools', function(done) {
      request.post('/school/createSchool')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send(school)
        .expect(400, school)
        .end(done)
    });

    it('should allow students and admins to add new teachers to schools', function(done) {
      request.post('/school/createTeacher')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send({
          school_id: 5,
          teacher_name: "Ms. Kim",
          teacher_email: "kim@school.com"
        })
        .expect(200, {
          teacher_name: "Ms. Kim",
          teacher_email: "kim@school.com",
          teacher_id: 7
        })
        .end(done)
    });

    it('should not allow incomplete teachers', function(done) {
      request.post('/school/createTeacher')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send({
          school_id: 5,
          teacher_name: "",
          teacher_email: ""
        })
        .expect(400, {
          teacher_name: "Cannot be blank",
          teacher_email: "Cannot be blank"
        })
        .end(done)
    });

    it('should not allow non-existant schools', function(done) {
      request.post('/school/createTeacher')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send({
          school_id: 2,
          teacher_name: "Ms. Kim",
          teacher_email: "kim@school.com"
        })
        .expect(400, {
          school_id: "School does not exist"
        })
        .end(done)
    });
  });

  describe('UPDATE', function() {
    it('should allow admins to update schools', function(done) {
      request.post('/school/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + adminToken)
        .send({
          school_id: 5,
          school_name: "New name"
        })
        .expect(200)
        .end(done)
    });

    it('should allow admins to update schools', function(done) {
      request.post('/school/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + adminToken)
        .send({
          teacher_id: 5,
          teacher_name: "New name"
        })
        .expect(200)
        .end(done)
    });

    it('should not allow an update without an ID', function(done) {
      request.post('/school/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + adminToken)
        .send({
          teacher_name: "New name"
        })
        .expect(400)
        .end(done)
    });

    it('should not allow users to update schools', function(done) {
      request.post('/school/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + token)
        .send({
          teacher_id: 5,
          teacher_name: "New name"
        })
        .expect(401)
        .end(done)
    });
  });

  xdescribe('SEARCH and READ', function() {
    it('allow users to search by state', function(done) {

    });

    it('allow users to search by zip code', function(done) {

    });

    it('allow users to search by name', function(done) {

    });

    it('allow users to search by teacher name', function(done) {

    });

    it('allow users to search by ID', function(done) {

    });
  })
});
