const path = require('path');
const fs = require('fs');
const https = require('https');
const cron = require('node-cron');
const bunyan = require('bunyan');
const uuid = require('uuid');
var log = bunyan.createLogger({name: 'sejong-api'});

let env = 'local';
let port = 3000;
let options = {};
for (let item in process.argv) {
  if (process.argv[item].indexOf('mode') != -1) {
    env = process.argv[item].split('=')[1]
  }

  if (process.argv[item].indexOf('port') != -1) {
    port = parseInt(process.argv[item].split('=')[1])
  }
}

if (env == "prod") {
  options.cert = fs.readFileSync('/etc/letsencrypt/live/api.sejongculturalsociety.info/fullchain.pem');
  options.key = fs.readFileSync('/etc/letsencrypt/live/api.sejongculturalsociety.info/privkey.pem');
}

require('dotenv').config({
  path: path.resolve(process.cwd(), env + '.env')
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

require('./auth/login.js');
require('./auth/jwt.js');

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") { res.status(200).send(); }
  next();
});
app.use((req, res, next) => {
  req.log = log.child({reqId: uuid(), path: req.path})
  req.log.info('New request')
  next();
});

const auth = require('./routes/auth.js');
const user = require('./routes/user.js');
const demographics = require('./routes/demographics.js');
const writing = require('./routes/writing.js');
const admin = require('./routes/admin.js');

app.use('/auth', auth);
app.use('/user', user);
app.use('/demographics', passport.authenticate('jwt', {session: false}), demographics);
app.use('/writing', passport.authenticate('jwt', {session: false}), writing);
app.use('/admin', passport.authenticate('jwt', {session: false}), admin);

app.get('/', (req, res) => {
  res.send("Hello world! v2")
});

app.listen(port, () => log.info({mode: env}, 'API listening on port ' + port));
if (env == "prod") { https.createServer(options, app).listen(443) }

const backup = require('./util/backup.js');
cron.schedule("0 4 * * *", backup);
