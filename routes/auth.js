const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validator = require('validator');
const db = require('../db/db.js');

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    console.log("Successful login as (" + req.user.user + ")");
    const token = jwt.sign(req.user, process.env.SECRET_KEY);
    res.send(token);
  }
);

router.post('/forgotPassword', (req, res) => {
  var email = req.body.email;
  console.log("Password reset request for " + email)
  if (validator.isEmail(email)) {
    db.user.resetPassword(email);
  }
  res.status(200).send();
})

module.exports = router;
