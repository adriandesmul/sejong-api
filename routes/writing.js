const router = require('express').Router();
const validator = require('validator');

const db = require('../db/db.js');

router.get('/sijo', (req, res) => {
  db.writing.read('sijo', req.user.guid, (error, data) => {
    if (error) {
      res.status(500).send('Error reading sijo');
      return;
    }

    res.send(data);
  })
})

router.get('/essay', (req, res) => {
  // TODO: Get and return writing for logged in user
  res.status(501).send("NYI - " + req.user.user);
})

router.post('/save', (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let entryType = req.body.entryType;

  if (!entryType) {
    res.status(400).send('Missing entry type');
    return;
  }

  if (!validator.isLength(title, {max: 200})) {
    res.status(422).send('Title too long');
    return;
  }

  db.writing.save(title, body, entryType, req.user.guid, (error, status) => {
    if (error) res.status(400);
    res.send(status);
  })
})

module.exports = router;
