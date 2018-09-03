const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

function createUser(username, email, password) {
  console.log('- - - MOCK - - -')
  console.log("Create user")
  console.log("Username: ", username)
  console.log("Email: ", email)
  console.log("Password: ", password)
  console.log("Successfully saved user");
}

function readUser(username) {
  var password = bcrypt.hashSync(username + "123", saltRounds)

  return {
    username: username,
    password: password,
    admin: false
  }
}

function updateUser(username, password) {
  console.log('- - - MOCK - - -')
  console.log('Update password')
  console.log("Username: ", username)
  console.log("Password: ", password)
  console.log("Successfully saved user");
}

function deleteUser() {

}

module.exports = function() {
  return {
    create: createUser,
    read: readUser,
    update: updateUser,
    delete: deleteUser
  }
}
