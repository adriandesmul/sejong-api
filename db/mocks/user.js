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

function readAllUsers(cb, log) {
  log.info("[MOCK] Read all users")

  var res = {
    error: false,
    data: null
  }

  var user1 = {
    user_id: 1,
    username: "test1",
    email: "test1@gmail.com",
    personal_first_name: "Jar Jar",
    personal_last_name: "Binks"
  }

  var user2 = {
    user_id: 2,
    username: "test2",
    email: "test2@gmail.com",
    personal_first_name: "Luke",
    personal_last_name: "Skywalker"
  }

  res.data = [user1, user2]

  cb(res)
}

function readUserById(user_id, cb, log) {
  log.info({id: user_id}, "[MOCK] Read specific user")

  var res = {
    error: false,
    data: null
  }

  var user1 = {
    "user_id": 1,
    "username": "adriandesmul",
    "email": "adriandesmul@gmail.com",
    "admin": 0,
    "demographics_id": 2,
    "personal_first_name": "John2",
    "personal_last_name": "Smith",
    "personal_date_of_birth": "1/2/2001",
    "address_line_1": "123 Main St.",
    "address_line_2": "Apt. 21",
    "address_town": "New Town",
    "address_state": "WA",
    "address_country": "Canada",
    "address_zip": "60293",
    "essay": {
        "submission_id": 3,
        "user_id": 1,
        "title": "Title",
        "body": "<p>Hello - this is my essay yosup!</p>",
        "type": "essay",
        "year": "2018",
        "division": "adult",
        "folktale": "jr-a"
    },
    "sijo": {
        "submission_id": 2,
        "user_id": 1,
        "title": "Title",
        "body": "<p>Hello - this is my sijo yosup!</p>",
        "type": "sijo",
        "year": "2018",
        "division": "adult",
        "folktale": ""
    }
  }

  res.data = user1

  cb(res)
}

module.exports = function() {
  return {
    create: createUser,
    read: readUser,
    update: updateUser,
    readAll: readAllUsers,
    readUserById: readUserById
  }
}
