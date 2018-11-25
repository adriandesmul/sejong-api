var pool = null;

function readDemographics(username) {
  console.log('- - - MOCK - - -')
  console.log('Read demographics for (' + username + ')');

  if (username == 'blank') {
    return {
      personal_first_name: '',
      personal_last_name: '',
      personal_date_of_birth: '',
      address_line_1: '',
      address_line_2: '',
      address_town: '',
      address_state: '',
      address_country: '',
      address_zip: ''
    }
  } else {
    return {
      personal_first_name: 'John',
      personal_last_name: 'Smith',
      personal_date_of_birth: '1/2/2001',
      address_line_1: '123 Main St.',
      address_line_2: 'Apt. B',
      address_town: 'My City',
      address_state: 'IL',
      address_country: 'United States of America',
      address_zip: '12345'
    }
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
