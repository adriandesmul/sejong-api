var pool = null;

function readWriting() {

}

function updateWriting() {

}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readWriting,
    update: updateWriting
  }
}
