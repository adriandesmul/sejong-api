var pool = null;

function readDemographics(username) {
  console.log('- - - MOCK - - -')
  console.log('Read demographics');
  return {
    personalFirstName: 'John',
    personalLastName: 'Smith',
    personalDateOfBirth: '1/2/2001',
    addressLine1: '123 Main St.',
    addressLine2: 'Apt. B',
    addressTown: 'My City',
    addressState: 'IL',
    addressCountry: 'United States of America',
    addressZip: '12345',
    schoolName: 'My School',
    schoolTown: 'My town',
    schoolState: 'IN',
    schoolCountry: 'United States of America',
    schoolTeacher: 'Mr. Teacher'
  }
}

function updateDemographics(username, data) {
  console.log('- - - MOCK - - -')
  console.log('Update demographics');
  console.log('Username: ', username);
  console.log(data)
}

module.exports = function() {
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
