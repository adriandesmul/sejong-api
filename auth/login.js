const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/db.js');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

passport.use(new LocalStrategy((username, password, done) => {
  console.log("Login attempt :: user: " + username + " :: pass: " + password);

  var user = db.user.read(username);
  if (!user) { return done(null, false); }

  if(bcrypt.compareSync(password, user.password)) {
    return done(null, {'user': user.username, 'admin': user.admin});
  }

  return done(null, false);
}))
