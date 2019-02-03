const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validator = require('validator');
const db = require('../db/db.js');

const bcrypt = require('bcrypt-nodejs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    req.log.info({user: req.user.user}, "Successful login");
    const token = jwt.sign(req.user, process.env.SECRET_KEY);
    res.send(token);
  }
);

router.post('/forgotPassword', (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  req.log.info({user: username}, "Password reset request");
  if (!validator.isEmail(email)) {
    res.status(200).send();
    return;
  }

  db.user.read(username, (res) => {
    req.log.info({user: username}, 'Getting email');
    if (res.error) return;

    if (res.user.email == email) {
      req.log.info({user: username}, 'Updaing password');
      var newPassword = "NewPassword"; // TODO: Randomize + email

      var hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(saltRounds));

      db.user.update(username, hashedPassword, res.user.email, res.user.admin, (result) => {
        req.log.info({user: username}, 'Password reset successful');
      }, req.log)
    }
  }, req.log)

  res.status(200).send();
})

module.exports = router;
