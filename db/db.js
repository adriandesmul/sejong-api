if (process.env.DB == "mock") {
  console.log("- - - USING MOCKS - - -")
  module.exports = {
    user: require('./mocks/user.js')(),
    demographics: require('./mocks/demographics.js')(),
    writing: require('./mocks/writing.js')()
  }
} else {

  var AWS = require('aws-sdk');
  var dynamo = new AWS.DynamoDB({region: 'us-east-1'})

  module.exports = {
    user: require('./user.js')(dynamo),
    demographics: require('./demographics.js')(dynamo),
    writing: require('./writing.js')(dynamo)
  }

}
