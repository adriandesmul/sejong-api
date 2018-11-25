var pool = null;
var competitionYear = process.env.YEAR;

function readWriting(entry_type, user_id, cb) {
  pool.query('SELECT * FROM writing WHERE user_id = ? AND type = ? AND year = ?',
    [user_id, entry_type, competitionYear] , (err, rows) => {
      if (err) {
        cb(true, err.code);
        return;
      }
      cb(false, rows[0] || { title: '', body: '' });
  });
}

function saveWriting(title, body, entry_type, user_id, cb) {
  pool.query('SELECT submission_id FROM writing WHERE user_id = ? AND type = ? AND year = ?',
    [user_id, entry_type, competitionYear] , (err, rows) => {

      if (err) {
        cb(true, err.code);
        return;
      }

      if (rows.length > 0) {

        pool.query('UPDATE writing SET ? WHERE ?',
          [
            {
              title: title,
              body: body
            }, {
              submission_id: rows[0].submission_id
            }
          ], (err, rows) => {
            if (err) {
              cb(true, err.code);
              return
            }
            console.log('Updated writing entry');
            cb(false, 'Submission save successful')
        });

      } else {
        pool.query('INSERT INTO writing SET ?', {
          title: title,
          body: body,
          year: competitionYear,
          type: entry_type,
          user_id: user_id
        }, (err, result) => {
          if (err) {
            cb(true, err.code);
            return
          }
          console.log('Created new writing entry');
          cb(false, 'Submission save successful')
        })
      }
    }
  )
}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readWriting,
    save: saveWriting
  }
}
