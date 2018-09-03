var pool = null;

function readDemographics() {
  console.log('- - - MOCK - - -')
  console.log('Read demographics');
}

function updateDemographics() {
  console.log('- - - MOCK - - -')
  console.log('Update demographics');
}

module.exports = function() {
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
