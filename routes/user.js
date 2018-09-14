const router = require('express').Router();
const passport = require('passport');

const validator = require('validator');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const db = require('../db/db.js');

router.post('/new', (req, res) => {

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  // Validate Username
  if(!validator.isAlphanumeric(username)) {
    res.status(422).send('Username not alphanumeric')
    return;
  }

  // Validate Email
  if(!validator.isEmail(email)) {
    res.status(422).send('Email not valid')
    return;
  }

  // Validate Password
  if(!validator.isLength(password, {min: 8})) {
    res.status(422).send('Password too short')
    return;
  }

  var hashedPassword = bcrypt.hashSync(password, saltRounds)

  db.user.create(username, email, hashedPassword, (result) => {
    if (result.error) res.status(400);
    res.send(result.status);
  });

});

router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

  var password = req.body.password;

  if(!validator.isLength(password, {min: 8})) {
    res.status(422).send('Password too short')
    return;
  }

  var hashedPassword = bcrypt.hashSync(password, saltRounds);

  db.user.update(req.user.guid, hashedPassword, (result) => {
    if (result.error) res.status(400)
    res.send(result.status)
  });

});

router.post('/forgot', (req, res) => {
  // TODO: Build forgot password functionality
  res.status(501)
})

module.exports = router;
