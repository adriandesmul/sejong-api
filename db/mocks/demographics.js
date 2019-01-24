var pool = null;

function readDemographics(user_id, keys, cb, log) {
  log.info({user: user_id}, "[MOCK] Read demographics")

  var returnObj;

  if (user_id == 2) {
    returnObj = {
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
    returnObj = {
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

  cb({
    error: false,
    data: returnObj
  })
}

function updateDemographics(user_id, data, cb, log) {
  log.info({user: user_id, data: data}, "[MOCK] Update demographics")

  cb({
    error: false,
    msg: 'Updated demographics for ' + user_id
  })
}

module.exports = function() {
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
