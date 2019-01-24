var pool = null;
var competition_year = process.env.YEAR;

var mysql = require('mysql')

function writingUpdateCallback(error, data, cb) {

  if (error) {
    console.log(error);
    cb({
      error: true,
      msg: "Unknown error"
    })
    return;
  }

  cb({
    error: false,
    msg: "Save successful"
  })
}

function saveWriting(user_id, submission_id, entry_type, division,
  folktale, title, body, cb) {

  var res = {
    error: false,
    msg: null
  }

  var dataObj = {
    user_id: user_id,
    type: entry_type,
    division: division,
    folktale: folktale,
    title: title,
    body: body,
    year: competition_year
  }

  pool.query("SELECT * FROM writing WHERE user_id = ? AND type = ? AND year = ?", [
    user_id, entry_type, competition_year
  ], (error, data) => {
    if (error) {
      console.log(error);
      res.error = true;
      res.msg = "Unknown error";
      cb(res);
      return;
    }

    if (data[0] && data[0].submission_id) {
      pool.query("UPDATE writing SET ? WHERE submission_id = ?", [
        dataObj,
        data[0].submission_id
      ], writingUpdateCallback(error, data, cb))
    } else {
      pool.query("INSERT INTO writing SET ?", [ dataObj ],
        writingUpdateCallback(error, data, cb));
    }

  })

}

function readWriting(entry_type, user_id, cb) {
  pool.query('SELECT * FROM writing WHERE user_id = ? AND type = ? AND year = ?',
    [user_id, entry_type, competition_year] , (err, rows) => {
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
