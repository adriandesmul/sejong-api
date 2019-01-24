const bcrypt = require('bcrypt-nodejs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

function createUser(username, email, password, cb, log) {
  log.info({username: username, email: email, password: password}, "[MOCK] Create user")

  cb({
    error: false,
    status: {
      'user': username,
      'admin': false
    }
  });
}

function readUser(username, cb, log) {
  var password = bcrypt.hashSync(username + "123", bcrypt.genSaltSync(saltRounds))

  var user = {
    username: username,
    password: password,
    email: username + "@gmail.com",
    admin: false
  }

  cb({
    error: false,
    user: user
  })
}

function updateUser(username, password, email, admin, cb, log) {
  log.info({data: {username: username, email: email, password: password}}, "[MOCK] Update password")

  cb({
    error: false,
    status: "Updated password: " + username
  })
}

module.exports = function() {
  return {
    create: createUser,
    read: readUser,
    update: updateUser
  }
}
