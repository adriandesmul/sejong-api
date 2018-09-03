var pool = null;

function readDemographics() {

}

function updateDemographics() {

}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
