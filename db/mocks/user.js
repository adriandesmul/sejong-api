const bcrypt = require('bcrypt');
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
    status: "Created user: " + username
  });
}

function readUser(username, cb) {
  var password = bcrypt.hashSync(username + "123", saltRounds)

  cb({
    guid: 'abc123',
    username: username,
    password: password,
    admin: false
  })
}

function updateUser(guid, password) {
  console.log('- - - MOCK - - -')
  console.log('Update password')
  console.log("GUID: ", guid)
  console.log("Password: ", password)
  console.log("Successfully saved user");
}

module.exports = function() {
  return {
    create: createUser,
    read: readUser,
    update: updateUser
  }
}
