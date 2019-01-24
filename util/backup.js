console.log('Starting database backup');

const child_process = require('child_process');
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

var date = new Date();
var dateString = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()

const cmd = "docker exec sejong-api_db_1 /usr/bin/mysqldump -u " + process.env.DB_USER + " --password=" + process.env.DB_PASS + " sejong > " + dateString + "-backup.sql"

child_process.execSync(cmd);

console.log('Exporting to S3')

const aws = require('aws-sdk');
var s3 = new aws.S3();

fs.readFile('./' + dateString + '-backup.sql', (err, data) => {
  var params = {
    Bucket: "sejong-api-backup",
    Body: data.toString(),
    Key: dateString + '-backup.sql'
  }

  s3.putObject(params, (err, data) => {
    if (err) {
      console.log(err)
      console.log("Error with database update")
    } else {
      console.log(data)
      console.log("Successfully completed database backup")
    }

    fs.unlink('./' + dateString + '-backup.sql', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Cleaned up backup file: " + dateString + '-backup.sql')
      }

    })
  })

})
