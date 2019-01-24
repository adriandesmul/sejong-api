var competitionYear = process.env.YEAR;

function readWriting(entry_type, user_id, cb, log) {
  log.info({user: user_id}, "[MOCK] Read writing")

  var blank_sijo = {
    "submission_id": '',
    "title": '',
    "body": '',
    "type": 'sijo',
    "division": '',
    "year": competitionYear
  }

  var test_sijo = {
    "submission_id": '1',
    "title": 'Title',
    "body": '<p>Hello - this is my sijo yosup!</p>',
    "type": 'sijo',
    "division": 'adult',
    "year": competitionYear
  }

  var blank_essay = {
    "submission_id": '',
    "title": '',
    "body": '',
    "type": 'essay',
    "division": '',
    "folktale": '',
    "year": competitionYear
  }

  var test_essay = {
    "submission_id": '2',
    "title": 'Test Essay Title',
    "body": '<p>My essay is here</p>',
    "type": 'essay',
    "division": 'junior',
    "folktale": 'cinderella',
    "year": competitionYear
  }

  var returnObj = {};

  if (entry_type == 'sijo' && user_id == 2) {
    returnObj = blank_sijo;
  } else if (entry_type == 'sijo') {
    returnObj = test_sijo;
  } else if (entry_type == 'essay' && user_id == 2) {
    returnObj = blank_essay;
  } else if (entry_type == 'essay') {
    returnObj = test_essay;
  }

  cb(false, returnObj);
}

function saveWriting(user_id, submission_id, entry_type, division,
  folktale, title, body, cb, log) {

  log.info({user: user_id, data: {
    user_id: user_id,
    submission_id: submission_id,
    title: title,
    body: body,
    entry_type: entry_type,
    division: division,
    folktale: folktale,
    competitionYear: competitionYear
  }}, "[MOCK] Update writing")

  cb({
    error: false,
    msg: 'Submission save successful'
  })
}

module.exports = function() {
  return {
    read: readWriting,
    save: saveWriting
  }
}
