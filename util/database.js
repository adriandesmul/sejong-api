const path = require('path');
const fs = require('fs');

let env = 'local';
for (let item in process.argv) {
  if (process.argv[item].indexOf('mode') != -1) {
    env = process.argv[item].split('=')[1]
  }
}

require('dotenv').config({
  path: path.resolve(process.cwd(), env + '.env')
});

var mysql = require('mysql');
var connection = mysql.createConnection({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
});

const toLoad = [
  'add_status.sql'
]

toLoad.forEach(file => {
  console.log(file);
  fs.readFile(path.join('./db/sql', file), (err, data) => {
    console.log("Getting SQL for " + path.join('./db/sql', file))
    connection.query(data.toString(), (err, res) => {
      console.log(err);
      console.log(res);
    })
  })
})
