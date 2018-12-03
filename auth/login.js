const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/db.js');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

passport.use(new LocalStrategy((username, password, done) => {
  console.log("[AUTH] Login attempt for (" + username + ")");

  db.user.read(username, (res) => {
      var user = res.user;

      if (!user) { return done(null, false); }
      if (res.error) { return done(null, false); }

      if(bcrypt.compareSync(password, user.password)) {
        return done(null, {
          'user': user.username,
          'email': user.email,
          'admin': user.admin
        });
      }

      return done(null, false);
  });

}))
