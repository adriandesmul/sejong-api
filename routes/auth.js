const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config.js');

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    console.log("Successful login");
    const token = jwt.sign(req.user, config.secret);
    res.send(token);
  }
);

module.exports = router;
