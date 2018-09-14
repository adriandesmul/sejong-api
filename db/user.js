var pool = null;

function createUser(username, email, password, cb) {
  var res = {
    error: false,
    status: ''
  }

  pool.query('INSERT INTO users SET ?', {
    username: username,
    email: email,
    password: password
  }, (err, result, fields) => {
    if (err) {
      res.error = true;
      res.status = 'Username already exists'
    } else {
      res.status = 'Created new user: ' + username
    }

    cb(res);

  })

}

function readUser(username, cb) {
  if (!username) { return; }

  var res = {
    error: false,
    user: null
  }

  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, rows, fields) => {
    if (err) {
      res.error = true;
      cb(res);
      return;
    }

    res.user = rows[0];
    cb(res);
  })
}

function updateUser(id, password, cb) {
  pool.query('UPDATE users SET password = ? WHERE user_id = ?', [password, id], (err, rows, fields) => {
    if (err) {
      cb({
        error: true,
        status: err.error_code
      })
      return
    }

    cb({
      error: false,
      status: "Updated password"
    })

  })
}

module.exports = function(connectionPool) {
  pool = connectionPool;

  return {
    create: createUser,
    read: readUser,
    update: updateUser
  }
}
