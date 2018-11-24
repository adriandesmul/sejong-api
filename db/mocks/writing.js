var competitionYear = process.env.YEAR;

function readWriting(entryType, user_id, cb) {
  console.log('- - - MOCK - - -')
  console.log('Read writing');
  cb(false, {
    "submission_id": 1,
    "user_id": 1,
    "title": "Title",
    "body": "<p>Hello - this is my sijo yosup!</p>",
    "type": "sijo",
    "year": 2018
  });
}

function saveWriting(title, body, entryType, user_id, cb) {
  console.log('- - - MOCK - - -')
  console.log('Update writing');
  console.log('Title: ', title);
  console.log('Body: ', body);
  console.log('Type: ', entryType);
  console.log('Year: ', competitionYear);
  cb(false, 'Submission save successful')
}

module.exports = function() {
  return {
    read: readWriting,
    save: saveWriting
  }
}
