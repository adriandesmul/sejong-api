const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/db.js');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

passport.use(new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {
  req.log.info({user: username}, "Login attempt");

  db.user.read(username, (res) => {
      var user = res.user;

      if (!user) { return done(null, false); }
      if (res.error) { return done(null, false); }

      try {
        if(bcrypt.compareSync(password, user.password)) {
          return done(null, {
            'user_id': user.user_id,
            'user': user.username,
            'email': user.email,
            'admin': user.admin
          });
        }
      } catch(e) {
        req.log.error(e)
        return done(null, false);
      }

      return done(null, false);
  }, req.log);

}))
