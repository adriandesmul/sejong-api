const router = require('express').Router();

const db = require('../db/db.js');
const validate = require('./validators/demographics.js').validate;

const keys = [
  "personal_first_name",
  "personal_last_name",
  "personal_date_of_birth",
  "address_line_1",
  "address_line_2",
  "address_town",
  "address_state",
  "address_country",
  "address_zip"
]

router.get('/', (req, res) => {

  db.demographics.read(req.user.user_id, keys, (result) => {
    if (result.error) {
      res.status(500).send();
      return;
    }
    req.log.info({user: req.user.user}, "Got demographics")
    res.send(result.data);
  }, req.log);


})

router.post('/update', (req, res) => {

  //var data = req.body;
  var data = {}

  for (let key of keys) {
    data[key] = req.body[key] || '';
  }

  var validityCheck = validate(data);

  if (validityCheck.isValid) {
    db.demographics.update(req.user.user_id, data, (result) => {
      if (result.error) {
        res.status(500).send(result.msg);
        return;
      }
      req.log.info({user: req.user.user}, "Updated demographics")
      res.status(200).send('Updated demographics for ' + req.user.user);
    }, req.log)
  } else {
    req.log.warn(validityCheck.errors)
    res.status(422).send(validityCheck.errors)
  }

})

module.exports = router;
