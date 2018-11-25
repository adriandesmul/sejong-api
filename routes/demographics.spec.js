const request = require('supertest')('http://localhost:3000')
const contentToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidGVzdCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTU0MzE1NjM4N30.PfqfrALotVGPmTY493Ty-vHMNASLOYW4z1oluko0Lvw"
const emptyToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmxhbmsiLCJlbWFpbCI6ImJsYW5rQGdtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTQzMTU2MDUxfQ.f7KmIPajA7DVBo1QKBAMOKa2zSa2q9dYFAM1p-Ka0H4"

describe('Demographics route', function() {
  describe('READ', function() {
    it('should return provided demographics if they exist', function(done) {
      request.get('/demographics')
        .set('Authorization', 'Bearer ' + contentToken)
        .expect(200, {
          personal_first_name: 'John',
          personal_last_name: 'Smith',
          personal_date_of_birth: '1/2/2001',
          address_line_1: '123 Main St.',
          address_line_2: 'Apt. B',
          address_town: 'My City',
          address_state: 'IL',
          address_country: 'United States of America',
          address_zip: '12345'
        })
        .end(done)
    });

    it('should return a blank object if none exist', function(done) {
      request.get('/demographics')
        .set('Authorization', 'Bearer ' + emptyToken)
        .expect(200, {
          personal_first_name: '',
          personal_last_name: '',
          personal_date_of_birth: '',
          address_line_1: '',
          address_line_2: '',
          address_town: '',
          address_state: '',
          address_country: '',
          address_zip: ''
        })
        .end(done)
    });
  })

  describe('UPDATE', function() {
    it('should save the demographic data as is', function(done) {
      request.post('/demographics/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + emptyToken)
        .send({
          personal_first_name: 'John',
          personal_last_name: 'Smith',
          personal_date_of_birth: '1/2/2001',
          address_line_1: '123 Main St.',
          address_line_2: 'Apt. B',
          address_town: 'My City',
          address_state: 'IL',
          address_country: 'United States of America',
          address_zip: '12345'
        })
        .expect(200, "Updated demographics for blank")
        .end(done)
    });

    it('should flag long entries', function(done) {
      request.post('/demographics/update')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', 'Bearer ' + emptyToken)
        .send({
          personal_first_name: 'John',
          personal_last_name: 'Smith',
          personal_date_of_birth: '1/2/2001',
          address_line_1: '123 Main St.',
          address_line_2: 'Apt. B',
          address_town: 'My City',
          address_state: 'IL',
          address_country: 'United States of America',
          address_zip: '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
        })
        .expect(res => {
          res.body = JSON.parse(res.error.text);
        })
        .expect(422, {
          address_zip: ["Entry too long"]
        })
        .end(done)
    });
  })
})
