const router = require('express').Router();

const db = require('../db/db.js');
const validate = require('./validators/demographics.js').validate;

router.get('/', (req, res) => {

  var data = db.demographics.read(req.user.guid);
  res.send(data);

})

router.post('/update', (req, res) => {

  var data = req.body;
  var validityCheck = validate(data);

  if (validityCheck.isValid) {
    db.demographics.update(req.user.guid, data)
    res.status(200).send('Updated demographics for ' + req.user.user)
  } else {
    res.status(422).send(validityCheck.errors)
  }

})

module.exports = router;
