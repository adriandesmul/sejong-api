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
    console.log("[AUTH] Successful login as (" + req.user.user + ")");
    const token = jwt.sign(req.user, process.env.SECRET_KEY);
    res.send(token);
  }
);

router.post('/forgotPassword', (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  console.log("[AUTH] Password reset request for (" + username + ")")
  if (!validator.isEmail(email)) {
    res.status(200).send();
    return;
  }

  db.user.read(username, (res) => {
    console.log('[AUTH - PW RESET] Getting email for (' + username + ')');
    if (res.error) return;

    if (res.user.email == email) {
      console.log('[AUTH - PW RESET] Updaing password for (' + username + ')');
      var newPassword = "NewPassword"; // TODO: Randomize + email

      var hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(saltRounds));

      db.user.update(username, hashedPassword, res.user.email, res.user.admin, (result) => {
        console.log(result);
      })
    }
  })

  res.status(200).send();
})

module.exports = router;
