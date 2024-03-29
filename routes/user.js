const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const validator = require('validator');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = parseInt(process.env.SALT_ROUNDS);

const db = require('../db/db.js');

router.post('/new', (req, res) => {

  var username = req.body.username || '';
  var email = req.body.email || '';
  var password = req.body.password || '';

  req.log.info({user: username}, "Creating user")

  // Validate Username
  if(!validator.isAlphanumeric(username)) {
    res.status(422).send('Username not alphanumeric')
    return;
  }

  if(!validator.isLength(username, {min: 3})) {
    res.status(422).send('Username too short')
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

  var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))

  db.user.create(username, email, hashedPassword, (result) => {
    if (result.error) {
      res.status(400);
      res.send(result.status);
      return;
    }

    req.log.info({user: username}, "Created user")
    const token = jwt.sign(result.status, process.env.SECRET_KEY)
    res.send(token)
  }, req.log);

});

router.post('/update', passport.authenticate('jwt', {session: false}), (req, res) => {

  var password = req.body.password;

  req.log.info({user: req.user.user}, "Updating user")

  if(!validator.isLength(password, {min: 8})) {
    res.status(422).send('Password too short')
    return;
  }

  var hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));

  db.user.update(req.user.user, hashedPassword, req.user.email, req.user.admin, (result) => {
    if (result.error) res.status(400)
    req.log.info({user: req.user.user}, "Updated user")
    res.send(result.status)
  }, req.log);

});

module.exports = router;
