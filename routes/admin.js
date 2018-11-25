const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db.js');

router.post('/spoof', (req, res) => {
  console.log(req.user)

  if (!req.user.admin) {
    res.status(401).send();
    return;
  }

  if (!req.body.username) {
    res.status(400).send();
    return;
  }

  db.user.read(req.body.username, (result) => {
    if (result.error) {
      res.status(500).send('Error reading user');
      return;
    }

    var userObj = {
      user: result.user.username,
      email: result.user.email,
      admin: false
    }

    console.log(userObj)

    res.send(jwt.sign(userObj, process.env.SECRET_KEY))
  })
})

module.exports = router;
