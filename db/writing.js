var pool = null;
var competition_year = process.env.YEAR;

function readWriting(entry_type, username, cb) {
  if (!entry_type || !username) { return; }

  var res = {
    error: false,
    data: null
  }


}

function saveWriting(username, submission_id, entry_type, division,
  folktale, title, body, cb) {

  var res = {
    error: false,
    msg: null
  }

  var putParams = {
    Item: {
      "submission_id": { S: submission_id },
      "username": { S: username },
      "title": { S: title },
      "body": { S: body },
      "entry_type": { S: entry_type },
      "division": { S: division },
      "folktale": { S: folktale },
      "year": { S: competition_year }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "sejong-entries"
  }

  pool.putItem(putParams, (err, data) => {
    if (err) {
      console.log(err);
      res.error = true;
      res.msg = "Unknown error";
      cb(res);
      return;
    }
    res.msg = "Save successful";
    cb(res);
  })

}

function readWriting_old(entry_type, user_id, cb) {
  pool.query('SELECT * FROM writing WHERE user_id = ? AND type = ? AND year = ?',
    [user_id, entry_type, competitionYear] , (err, rows) => {
      if (err) {
        cb(true, err.code);
        return;
      }
      cb(false, rows[0] || { title: '', body: '' });
  });
}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readWriting,
    save: saveWriting
  }
}
