const router = require('express').Router();

const db = require('../db/db.js');

router.get('/', (req, res) => {
  // TODO: Get and return demographics for logged in user
  res.status(501).send("NYI - " + req.user.user);
})

router.post('/update', (req, res) => {
  // TODO: Update demographics for user
  res.status(501).send("NYI - " + req.user.user);
})

module.exports = router;
