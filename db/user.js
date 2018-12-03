var pool = null;
const uuid = require('uuid/v4')

function createUser(username, email, password, cb) {
  var res = {
    error: false,
    status: ''
  }

  var getParams = {
    Key: {
      "username": { S: username }
    },
    TableName: "sejong-users"
  };

  var putParams = {
    Item: {
      "username": { S: username },
      "email": { S: email },
      "password": { S: password },
      "admin": { BOOL: false }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "sejong-users"
  };

  pool.getItem(getParams, (err, data) => {
    if (err) {
      console.log(err);
      res.error = true;
      res.status = "Unknown error"
      cb(res);
      return;
    }

    if (data.Item) {
      res.error = true;
      res.status = "Username already exists"
      console.log("Attempted to create new user: (" + username + ") and the user already exists");
      cb(res)
    } else {
      pool.putItem(putParams, (err, data) => {
        if (err) console.log(err);
        res.status = {
          'user': username,
          'admin': false
        }
        console.log('Created new user: ' + username);
        cb(res)
      })
    }
  })

}

function readUser(username, cb) {
  if (!username) { return; }

  var res = {
    error: false,
    user: null
  }

  var getParams = {
    Key: {
      "username": { S: username }
    },
    TableName: "sejong-users"
  }

  pool.getItem(getParams, (err, data) => {
    if (err) {
      console.log(err);
      res.error = true;
      cb(res);
      return;
    }

    if (data.Item) {
      console.log(data.Item)
      res.user = {
        username: data.Item.username.S,
        password: data.Item.password.S,
        admin: data.Item.admin.BOOL,
        email: data.Item.email.S
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

  var putParams = {
    Item: {
      "username": { S: username },
      "password": { S: password },
      "email": { S: email },
      "admin": { BOOL: admin }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "sejong-users"
  }

  pool.putItem(putParams, (err, data) => {
    if (err) {
      console.log(err);
      res.error = true;
      res.status = "Unknown error";
      cb(res);
      return;
    }

    res.status = "Updated password";
    cb(res);
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
