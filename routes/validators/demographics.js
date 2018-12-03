const v = require('validator');

function validateDemographics(data) {
  var errors = {};
  var isValid = true;

  // Check empties
  /*
  var checkEmpties = [
    'personal_first_name',
    'personal_last_name',
    'personal_date_of_birth'
  ]
  for (let key of checkEmpties) {
    if (!v.isEmpty(data[key])) { continue; }
    isValid = false;
    if (!errors[key]) { errors[key] = [] }
    errors[key].push('Required field');
  }
  */

  // Check length
  var checkLength = [
    'personal_first_name',
    'personal_last_name',
    'personal_date_of_birth',
    'address_line_1',
    'address_line_2',
    'address_town',
    'address_state',
    'address_country',
    'address_zip'
  ]
  for (let key of checkLength) {
    if (v.isLength(data[key], {max: 100})) { continue; }
    isValid = false;
    if (!errors[key]) { errors[key] = [] }
    errors[key].push('Entry too long');
  }

  return {
    isValid: isValid,
    errors: errors
  }
}

module.exports = {
  validate: validateDemographics
}
