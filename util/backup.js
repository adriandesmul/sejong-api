const bunyan = require('bunyan');
const uuid = require('uuid');
var log = bunyan.createLogger({name: 'sejong-api-backup'});

function backup() {

  const backup_id = uuid();

  log.info({id: backup_id}, "Starting DB backup")

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

  log.info({id: backup_id}, "Export to S3")

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
        log.error({id: backup_id, error: error}, "Error with backup")
      } else {
        log.info({id: backup_id, data: data}, "Backup complete")
      }

      fs.unlink('./' + dateString + '-backup.sql', (err) => {
        if (err) {
          log.error({id: backup_id, error: error}, "Cleanup error")
        } else {
          log.info({id: backup_id}, "Cleaned up backup file")
        }

      })
    })

  })
}

module.exports = backup
