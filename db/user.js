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
      console.log(err.code)
      res.error = true;
      res.status = 'Username already exists'
    } else {
      res.status = 'Created new user: ' + username
    }

    cb(res);

  })

}

function readUser(username) {
  if (!username) { return; }
  pool.query('SELECT * FROM users WHERE username = ?', [username], (err, rows, fields) => {
    console.log(rows)
  })
}

function updateUser() {

}

module.exports = function(connectionPool) {
  pool = connectionPool;

  return {
    create: createUser,
    read: readUser,
    update: updateUser
  }
}
