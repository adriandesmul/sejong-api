const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

require('./auth/login.js');
require('./auth/jwt.js');

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));

const auth = require('./routes/auth.js');

app.use('/auth', auth);

app.get('/', (req, res) => res.send("Hello world!"));

app.get('/user', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    console.log(req.user, req.admin);
    res.send("User: " + req.user.user + " :: Admin: " + req.user.admin);
  }
)

app.listen(3000, () => console.log('API listening on port 3000!'));
