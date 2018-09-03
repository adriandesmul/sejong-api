const v = require('validator');

function validateDemographics(data) {
  var errors = {};
  var isValid = true;

  // Check empties
  var checkEmpties = [
    'personalFirstName',
    'personalLastName',
    'personalDateOfBirth'
  ]
  for (let key of checkEmpties) {
    if (!v.isEmpty(data[key])) { continue; }
    isValid = false;
    if (!errors[key]) { errors[key] = [] }
    errors[key].push('Required field');
  }

  // Check length
  var checkLength = [
    'personalFirstName',
    'personalLastName',
    'personalDateOfBirth',
    'addressLine1',
    'addressLine2',
    'addressTown',
    'addressState',
    'addressCountry',
    'addressZip',
    'schoolName',
    'schoolTown',
    'schoolState',
    'schoolCountry',
    'schoolTeacher'
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
