const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  console.log("Login attempt :: user: " + username + " :: pass: " + password);
  if (password == username + "123") {
    return done(null, {'user': username, 'admin': false});
  } else {
    return done(null, false);
  }
}))
