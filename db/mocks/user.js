const bcrypt = require('bcrypt-nodejs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

function createUser(username, email, password, cb) {
  console.log('- - - MOCK - - -')
  console.log("Create user")
  console.log("Username: ", username)
  console.log("Email: ", email)
  console.log("Password: ", password)
  console.log("Successfully saved user");
  cb({
    error: false,
    status: {
      'user': username,
      'admin': false
    }
  });
}

function readUser(username, cb) {
  var password = bcrypt.hashSync(username + "123", bcrypt.genSaltSync(saltRounds))

  var user = {
    user_id: '123',
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

function updateUser(username, password, email, admin, cb) {
  console.log('- - - MOCK - - -')
  console.log('Update password')
  console.log("Username: ", username)
  console.log("Password: ", password)
  console.log("Successfully saved user");
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
