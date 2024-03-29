const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db.js');

router.post('/spoof', (req, res) => {
  req.log.info({user: req.user}, "Requesting spoof")

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
      user_id: result.user.user_id,
      user: result.user.username,
      email: result.user.email,
      admin: false
    }

    res.send(jwt.sign(userObj, process.env.SECRET_KEY))
  }, req.log)
})

router.get('/users', (req, res) => {
  if (!req.user.admin) {
    res.status(401).send();
    return;
  }

  db.user.readAll((result) => {
    if (result.error) {
      res.status(500).send('Error getting users');
      return
    }

    res.send(result.data);
  }, req.log);
});

router.get('/users/:id', (req, res) => {
  if (!req.user.admin) {
    res.status(401).send();
    return;
  }

  var returnData;

  db.user.readUserById(req.params.id, (result) => {
    if (result.error) {
      res.status(500).send('Error getting user');
      return
    }

    if (!result.data) {
      res.send({});
      return;
    }

    returnData = result.data

    db.writing.read('essay', req.params.id, (err, essay) => {
      if (err) {
        res.status(500).send('Error getting essay')
        return
      }

      returnData.essay = essay;

      db.writing.read('sijo', req.params.id, (err, sijo) => {
        if (err) {
          res.status(500).send('Error getting essay')
          return
        }

        returnData.sijo = sijo;
        res.send(returnData);

      }, req.log)

    }, req.log)

  }, req.log);
});

module.exports = router;
