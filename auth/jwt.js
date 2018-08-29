const config = require('../config.js');

const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const JWTOpts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

passport.use(new JWTStrategy(JWTOpts, (jwt_payload, done) => {
  console.log("JWT Payload :: ");
  console.log(jwt_payload);
  return done(null, jwt_payload);
}));
