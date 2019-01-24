var pool = null;
const uuid = require('uuid/v4')

function createUser(username, email, password, cb) {
  var res = {
    error: false,
    status: ''
  }

  pool.query("SELECT user_id FROM users WHERE username = ?",
    [username], (error, data) => {

    if (error) {
      console.log(error);
      res.error = true;
      cb(res);
      return;
    }

    if (data[0] && data[0].user_id) {
      res.error = true;
      res.status = "Username already exists"
      console.log("Attempted to create new user: (" + username + ") and the user already exists");
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
        console.log(error);
        res.error = true;
        res.status = "Unknown error"
        cb(res)
        return;
      }

      console.log("Created new user: " + username);
      res.status = {
        user: username,
        admin: false
      }
      cb(res);
    })

  })
}

function readUser(username, cb) {
  if (!username) { return; }

  var res = {
    error: false,
    user: null
  }

  pool.query('SELECT * FROM users WHERE username = ?', [username], (error, data) => {
    if (error) {
      console.log(error);
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

function updateUser(username, password, email, admin, cb) {
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
      console.log(error);
      res.error = true;
      res.status = "Unknown error";
      cb(res);
      return;
    }

    res.status = "Updated password"
    cb(res)
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
