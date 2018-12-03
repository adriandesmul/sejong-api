const request = require('supertest')('http://localhost:3000')
const contentToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MzE1NjM4N30.PfqfrALotVGPmTY493Ty-vHMNASLOYW4z1oluko0Lvw"
const emptyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmxhbmsiLCJlbWFpbCI6ImJsYW5rQGdtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTQzMTU2MDUxfQ.f7KmIPajA7DVBo1QKBAMOKa2zSa2q9dYFAM1p-Ka0H4"

describe('Writing route', function() {
  describe('SIJO', function() {
    it('should return a sijo if one exists', function(done) {
      request.get('/writing/sijo')
        .set('Authorization', 'Bearer ' + contentToken)
        .expect(200, {
          submission_id: '1',
          title: 'Title',
          type: 'sijo',
          year: "2018",
          division: 'adult',
          body: "<p>Hello - this is my sijo yosup!</p>"
        })
        .end(done)
    })

    it('should return nothing if no sijo exists', function(done) {
      request.get('/writing/sijo')
        .set('Authorization', 'Bearer ' + emptyToken)
        .expect(200, {
          submission_id: '',
          title: '',
          type: 'sijo',
          year: "2018",
          division: '',
          body: ''
        })
        .end(done)
    })
  })

  describe('ESSAY', function() {
    it('should return an essay if one exists', function(done) {
      request.get('/writing/essay')
        .set('Authorization', 'Bearer ' + contentToken)
        .expect(200, {
          submission_id: '2',
          title: 'Test Essay Title',
          type: 'essay',
          year: "2018",
          division: 'junior',
          folktale: 'cinderella',
          body: '<p>My essay is here</p>'
        })
        .end(done)
    })

    it('should return nothing if no essay exists', function(done) {
      request.get('/writing/essay')
        .set('Authorization', 'Bearer ' + emptyToken)
        .expect(200, {
          submission_id: '',
          title: '',
          type: 'essay',
          year: "2018",
          division: '',
          folktale: '',
          body: ''
        })
        .end(done)
    })
  })

  describe('SAVE', function() {
    it('should save a sijo with a body, division, and optional title', function(done) {
      request.post('/writing/save')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + emptyToken)
        .send({
          title: 'Title',
          body: '<p>New Body</p>',
          entry_type: 'sijo',
          submission_id: '',
          division: 'adult',
          folktale: ''
        })
        .expect(200, "Submission save successful")
        .end(done)
    })

    it('should save an essay with a body, division, title, and folktale (if needed)', function(done) {
      request.post('/writing/save')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + contentToken)
        .send({
          title: 'Title',
          body: '<p>New Body</p>',
          entry_type: 'essay',
          submission_id: '',
          division: 'adult',
          folktale: 'cinderella'
        })
        .expect(200)
        .end(done)
    })

    it('should fail if the entry type is missing', function(done) {
      request.post('/writing/save')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + contentToken)
        .send({
          title: 'Title',
          body: '<p>New Body</p>',
          entry_type: '',
          submission_id: '',
          division: 'adult',
          folktale: 'cinderella'
        })
        .expect(res => {
          res.body = res.error.text
        })
        .expect(400, 'Missing entry type')
        .end(done)
    })

    it('should fail is the title is too long', function(done) {
      request.post('/writing/save')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + contentToken)
        .send({
          title: 'Title is so long omg so long how do we deal with this so long. Title is so long omg so long how do we deal with this so long. Title is so long omg so long how do we deal with this so long.',
          body: '<p>New Body</p>',
          entry_type: 'essay',
          submission_id: '',
          division: 'adult',
          folktale: 'cinderella'
        })
        .expect(res => {
          res.body = res.error.text
        })
        .expect(422, 'Title too long')
        .end(done)
    })
  })
})
