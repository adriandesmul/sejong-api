var mysql = require('mysql');

var pool = { query: 'q' }

/*
var pool = mysql.createPool({
  connectionLimit: 5,
  host: '',
  user: '',
  password: '',
  database: ''
});

pool.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})
*/

if (process.env.DB == "mock") {
  console.log("- - - USING MOCKS - - -")
  module.exports = {
    user: require('./mocks/user.js')()
  }
} else {
  module.exports = {
    user: require('./user.js')(pool)
  }
}
