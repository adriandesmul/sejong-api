const router = require('express').Router();
const validator = require('validator');

const db = require('../db/db.js');

router.post('/createSchool', (req, res) => {
  var school_name = req.body.school_name || '';
  var school_city = req.body.school_city || '';
  var school_state = req.body.school_state || '';
  var school_country = req.body.school_country || '';
  var school_zip = req.body.school_zip || '';

  var school = {
    school_name: school_name,
    school_city: school_city,
    school_state: school_state,
    school_country: school_country,
    school_zip: school_zip
  }

  req.log.info({school: school}, "Creating new school");

  var validation_errors = {};
  var have_error = false

  for (let key in school) {
    if (validator.isEmpty(school[key])) {
      validation_errors[key] = "Cannot be blank";
      have_error = true;
    }
  }

  if (have_error) {
    req.log.warn({errors: validation_errors}, "School validation issues")
    res.status(400).send(validation_errors);
    return;
  }

  db.school.findSchool({school_name: school_name},
    (error, result) => {

    if (error) {
      res.sendStatus(500);
      return
    }

    var dup = false;
    for (let i in result) {
      if (school_city == result[i].school_city &&
        school_state == result[i].school_state) {
        dup = true;
      }
    }

    if (dup) {
      res.status(400).send({school: "School already exists"});
      return;
    }

    db.school.createSchool(school, (error, result) => {

      if (error) {
        res.sendStatus(500);
        return
      }

      school.school_id = result.school_id;

      req.log.info({school: school}, "New school created");
      res.send(school)

    }, req.log)
  }, req.log)

});

router.post('/createTeacher', (req, res) => {

  var school_id = req.body.school_id;

  var teacher = {
    teacher_name: req.body.teacher_name,
    teacher_email: req.body.teacher_email
  }

  req.log.info({teacher: teacher}, "Creating new teacher");

  var validation_errors = {};
  var have_error = false

  if (validator.isEmpty(teacher.teacher_name)) {
    validation_errors.teacher_name = "Cannot be blank";
    have_error = true;
  }

  if (validator.isEmpty(teacher.teacher_email)) {
    validation_errors.teacher_email = "Cannot be blank";
    have_error = true;
  }

  if (have_error) {
    req.log.warn({errors: validation_errors}, "School validation issues")
    res.status(400).send(validation_errors);
    return;
  }

  db.school.findSchool({school_id: school_id}, (error, result) => {

    if (error) {
      res.sendStatus(500);
      return
    }

    if (result.length == 0) {
      res.status(400).send({ school_id: "School does not exist" });
      req.log.warn("School does not exist")
      return;
    }

    db.school.createTeacher(school_id, teacher, (error, result) => {

      if (error) {
        res.sendStatus(500);
        return
      }

      teacher.teacher_id = result.teacher_id;

      req.log.info({teacher: teacher}, "New teacher created");
      res.send(teacher)

    }, req.log)
  }, req.log)

});

router.post('/update', (req, res) => {

  req.log.info("Updating teacher / school");

  if (!req.user.admin) {
    res.sendStatus(401);
    return;
  }

  if (req.body.teacher_id) {
    var teacher = {
      school_id: req.body.school_id || '',
      teacher_id: req.body.teacher_id || '',
      teacher_name: req.body.teacher_name || '',
      teacher_email: req.body.teacher_email || ''
    }

    db.school.updateTeacher(teacher, (error, result) => {
      if (error) {
        res.sendStatus(500);
        return
      }

      res.send("Update complete")
    }, req.log)

    return;
  } else if (req.body.school_id) {

    var school = {
      school_id: req.body.school_id || '',
      school_name: req.body.school_name || '',
      school_city: req.body.school_city || '',
      school_state: req.body.school_state || '',
      school_country: req.body.school_country || '',
      school_zip: req.body.school_zip || ''
    }

    db.school.updateSchool(school, (error, result) => {
      if (error) {
        res.sendStatus(500);
        return
      }

      res.send("Update complete")
    }, req.log)

    return;
  } else {
    res.sendStatus(400);
  }

});

router.get('/find/:field/:id', (req, res) => {
  var field = req.params.field;
  var id = req.params.id;

  if (field == "school_state" && id.length == 2) {
    db.school.findSchool({school_state: id}, (error, result) => {
      if (error) {
        res.sendStatus(500);
        return
      }

      res.send(result);
    }, req.log)
  } else if (field == "school_id") {
    db.school.findTeacher({school_id: id}, (error, result) => {
      if (error) {
        res.sendStatus(500);
        return
      }

      res.send(result);
    }, req.log)
  } else {
    res.sendStatus(400);
  }

});

module.exports = router;
