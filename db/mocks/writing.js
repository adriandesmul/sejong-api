var pool = null;

function readWriting() {
  console.log('- - - MOCK - - -')
  console.log('Read writing');
}

function updateWriting() {
  console.log('- - - MOCK - - -')
  console.log('Update writing');
}

module.exports = function() {
  return {
    read: readWriting,
    update: updateWriting
  }
}
