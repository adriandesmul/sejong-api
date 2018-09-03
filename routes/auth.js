const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    console.log("Successful login as (" + req.user.user + ")");
    const token = jwt.sign(req.user, process.env.SECRET_KEY);
    res.send(token);
  }
);

module.exports = router;
