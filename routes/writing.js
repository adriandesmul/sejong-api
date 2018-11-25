const router = require('express').Router();
const validator = require('validator');

const db = require('../db/db.js');
const uuid = require('uuid/v4')

router.get('/sijo', (req, res) => {
  db.writing.read('sijo', req.user.user, (error, data) => {
    if (error) {
      res.status(500).send('Error reading sijo');
      return;
    }

    res.send(data);
  })
})

router.get('/essay', (req, res) => {
  db.writing.read('essay', req.user.user, (error, data) => {
    if (error) {
      res.status(500).send('Error reading essay');
      return;
    }

    res.send(data);
  })
})

router.post('/save', (req, res) => {
  let title = req.body.title;
  let body = req.body.body;
  let entry_type = req.body.entry_type;
  let submission_id = req.body.submission_id || uuid();
  let division = req.body.division;
  let folktale = req.body.folktale;

  if (!entry_type) {
    res.status(400).send('Missing entry type');
    return;
  }

  if (!validator.isLength(title, {max: 100})) {
    res.status(422).send('Title too long');
    return;
  }

  db.writing.save(req.user.user, submission_id, entry_type, division,
    folktale, title, body, (error, status) => {
    if (error) res.status(400);
    res.send(status);
  })
})

module.exports = router;
