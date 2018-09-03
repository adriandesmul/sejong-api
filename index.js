const path = require('path');

require('dotenv').config({
  path: path.resolve(process.cwd(), 'local.env')
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

require('./auth/login.js');
require('./auth/jwt.js');

var db = require('./db/db.js');

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use((req, res, next) => {
  console.log('- - -');
  console.log('API Request on ' + req.path);
  next();
});

const auth = require('./routes/auth.js');
const user = require('./routes/user.js');

app.use('/auth', auth);
app.use('/user', user);

app.get('/', (req, res) => res.send("Hello world!"));

app.listen(3000, () => console.log('API listening on port 3000!'));
