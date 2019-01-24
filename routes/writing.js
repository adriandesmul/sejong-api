const router = require('express').Router();
const validator = require('validator');

const db = require('../db/db.js');
const uuid = require('uuid/v4')

router.get('/sijo', (req, res) => {
  req.log.info({user: req.user.user}, 'Attempting to read sijo');
  db.writing.read('sijo', req.user.user_id, (error, data) => {
    if (error) {
      res.status(500).send('Error reading sijo');
      return;
    }

    req.log.info({user: req.user.user}, 'Successfully read sijo');
    res.send(data);
  }, req.log)
})

router.get('/essay', (req, res) => {
  req.log.info({user: req.user.user}, 'Attempting to read essay');
  db.writing.read('essay', req.user.user_id, (error, data) => {
    if (error) {
      res.status(500).send('Error reading essay');
      return;
    }

    req.log.info({user: req.user.user}, 'Successfully read essay');
    res.send(data);
  }, req.log)
})

router.post('/save', (req, res) => {
  req.log.info({user: req.user.user}, 'Attempting to save writing');

  let title = req.body.title;
  let body = req.body.body;
  let entry_type = req.body.entry_type;
  let submission_id = req.body.submission_id;
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

  db.writing.save(req.user.user_id, submission_id, entry_type, division,
    folktale, title, body, (result) => {
    if (result.error) {
      res.status(400);
      req.log.info({user: req.user.user}, 'Failed to save writing');
    } else {
      req.log.info({user: req.user.user}, 'Successfully saved writing');
    }
    res.send(result.msg);
  }, req.log)
})

module.exports = router;
