/*

var mysql = require('mysql');

var pool;

if (process.env.DB == "mock") {
  console.log("- - - USING MOCKS - - -")
  module.exports = {
    user: require('./mocks/user.js')(),
    demographics: require('./mocks/demographics.js')(),
    writing: require('./mocks/writing.js')()
  }
} else {

  var pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  module.exports = {
    user: require('./user.js')(pool),
    demographics: require('./demographics.js')(pool),
    writing: require('./writing.js')(pool)
  }
}

*/

if (process.env.DB == "mock") {
  console.log("- - - USING MOCKS - - -")
  module.exports = {
    user: require('./mocks/user.js')(),
    demographics: require('./mocks/demographics.js')(),
    writing: require('./mocks/writing.js')()
  }
} else {

  const uuid = require('uuid/v4')

  var AWS = require('aws-sdk');
  var dynamo = new AWS.DynamoDB({region: 'us-east-1'})

  let params = {
    Item: {
      "user_id": {
        S: uuid()
      },
      "username": {
        S: "test"
      },
      "email": {
        S: "test@example.com"
      },
      "password": {
        S: "test123"
      },
      "admin": {
        BOOL: true
      }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "sejong-users"
  }

  dynamo.putItem(params, (err, data) => {
    if (err) console.log(err)
    console.log(data)
  })
}
