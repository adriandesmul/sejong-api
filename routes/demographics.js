const router = require('express').Router();

const db = require('../db/db.js');
const validate = require('./validators/demographics.js').validate;

router.get('/', (req, res) => {

  var data = db.demographics.read(req.user.user);
  res.send(data);

})

router.post('/update', (req, res) => {

  //var data = req.body;
  var data = {}

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

  for (let key of keys) {
    data[key] = req.body[key] || '';
  }

  var validityCheck = validate(data);

  if (validityCheck.isValid) {
    db.demographics.update(req.user.user, data)
    res.status(200).send('Updated demographics for ' + req.user.user)
  } else {
    console.log(validityCheck.errors)
    res.status(422).send(validityCheck.errors)
  }

})

module.exports = router;
