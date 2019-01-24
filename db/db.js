if (process.env.DB == "mock") {
  module.exports = {
    user: require('./mocks/user.js')(),
    demographics: require('./mocks/demographics.js')(),
    writing: require('./mocks/writing.js')()
  }
} else {

  var mysql = require('mysql');
  var pool = mysql.createPool({
    connectionLimit: 10,
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
  });

  module.exports = {
    user: require('./user.js')(pool),
    demographics: require('./demographics.js')(pool),
    writing: require('./writing.js')(pool)
  }

}
