const router = require('express').Router();
const validator = require('validator');

const db = require('../db/db.js');
const uuid = require('uuid/v4')

router.get('/sijo', (req, res) => {
  console.log('[WRITING - SIJO] Attempting to read sijo for (' + req.user.user + ')');
  db.writing.read('sijo', req.user.user, (error, data) => {
    if (error) {
      res.status(500).send('Error reading sijo');
      return;
    }

    console.log('[WRITING - SIJO] Successfully read sijo for (' + req.user.user + ')');
    res.send(data);
  })
})

router.get('/essay', (req, res) => {
  console.log('[WRITING - ESSAY] Attempting to read essay for (' + req.user.user + ')');
  db.writing.read('essay', req.user.user, (error, data) => {
    if (error) {
      res.status(500).send('Error reading essay');
      return;
    }

    console.log('[WRITING - ESSAY] Successfully read essay for (' + req.user.user + ')');
    res.send(data);
  })
})

router.post('/save', (req, res) => {
  console.log('[WRITING - SAVE] Attempting to save entry for (' + req.user.user + ')');

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
    console.log('[WRITING - SAVE] Successfully saved entry for (' + req.user.user + ')');
    res.send(status);
  })
})

module.exports = router;
