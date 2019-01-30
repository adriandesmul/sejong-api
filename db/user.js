var pool = null;
const uuid = require('uuid/v4')

function createUser(username, email, password, cb, log) {
  var res = {
    error: false,
    status: ''
  }

  pool.query("SELECT user_id FROM users WHERE username = ?",
    [username], (error, data) => {

    if (error) {
      log.error(error);
      res.error = true;
      cb(res);
      return;
    }

    if (data[0] && data[0].user_id) {
      res.error = true;
      res.status = "Username already exists"
      log.warn({user: username}, "User already exists");
      cb(res);
      return;
    }

    pool.query("INSERT INTO users SET ?", {
      username: username,
      password: password,
      email: email,
      admin: false
    }, (error, data) => {
      if (error) {
        log.error(error);
        res.error = true;
        res.status = "Unknown error"
        cb(res)
        return;
      }

      log.info({user: username}, "Created new user");
      res.status = {
        user: username,
        admin: false
      }
      cb(res);
    })

  })
}

function readUser(username, cb, log) {
  if (!username) { return; }

  var res = {
    error: false,
    user: null
  }

  pool.query('SELECT * FROM users WHERE username = ?', [username], (error, data) => {
    if (error) {
      log.error(error);
      res.error = true;
      cb(res);
      return;
    }

    if (data[0] && data[0].user_id) {
      res.user = {
        user_id: data[0].user_id,
        username: data[0].username,
        password: data[0].password,
        admin: data[0].admin,
        email: data[0].email
      }
      cb(res);
      return;
    }

    res.error = true;
    cb(res);

  })
}

function updateUser(username, password, email, admin, cb, log) {
  var res = {
    error: false,
    status: ''
  };

  pool.query("UPDATE users SET ? WHERE username = ?", [
    {
      password: password,
      email: email,
      admin: admin
    },
    username
  ], (error, data) => {
    if (error) {
      log.error(error);
      res.error = true;
      res.status = "Unknown error";
      cb(res);
      return;
    }

    res.status = "Updated password"
    cb(res)
  })
}

function readAllUsers(cb, log) {
  var res = {
    error: false,
    data: null
  }

  pool.query("SELECT u.user_id, username, email, personal_first_name, " +
    "personal_last_name FROM users u LEFT JOIN demographics d" +
    " ON u.user_id = d.user_id", (error, data) => {

    if (error) {
      log.error(error);
      res.error = true
      cb(res);
      return;
    }

    res.data = data;
    cb(res)

  });
}

function readUserById(user_id, cb, log) {
  var res = {
    error: false,
    data: null
  }

  pool.query("SELECT * FROM users u LEFT JOIN demographics d" +
    " ON u.user_id = d.user_id WHERE u.user_id = ?", [user_id], (error, data) => {

    if (error) {
      log.error(error);
      res.error = true
      cb(res);
      return;
    }

    if (data[0].password) {
      delete data[0].password
    }

    res.data = data[0];
    cb(res)

  });
}

module.exports = function(connectionPool) {
  pool = connectionPool;

  return {
    create: createUser,
    read: readUser,
    update: updateUser,
    readAll: readAllUsers,
    readUserById: readUserById
  }
}
