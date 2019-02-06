var pool;
var mysql = require('mysql');

function createSchool(school, cb, log) {
  pool.query("INSERT INTO schools SET ?", [school], (error, data) => {
    if (error) {
      log.error(error);
      cb(true, {});
      return;
    }

    cb(false, {school_id: data.insertId})
  })
}

function createTeacher(school_id, teacher, cb, log) {
  teacher.school_id = school_id;

  pool.query("INSERT INTO teachers SET ?", teacher, (error, data) => {
    if (error) {
      log.error(error);
      cb(true, {});
      return;
    }

    cb(false, {teacher_id: data.insertId})
  })
}

function updateSchool(school, cb, log) {
  log.info({school: school}, "Updated school");
  pool.query("UPDATE schools SET ? WHERE ?",
    [school, {school_id: school.school_id}], (error, data) => {

    if (error) {
      log.error(error);
      cb(true, null);
      return;
    }

    cb(false, null);

  });
}

function updateTeacher(teacher, cb, log) {
  log.info({teacher: teacher}, "Updated teacher");
  pool.query("UPDATE teachers SET ? WHERE ?",
    [teacher, {teacher_id: teacher.teacher_id}], (error, data) => {

    if (error) {
      log.error(error);
      cb(true, null);
      return;
    }

    cb(false, null);

  });
}

function findSchool(query, cb, log) {
  log.info(query, "Finding school");
  pool.query("SELECT * FROM schools WHERE ?", query, (error, data) => {
    if (error) {
      log.error(error);
      cb(true, {});
      return;
    }

    cb(false, data)
  })
}

function findTeacher(query, cb, log) {
  log.info(query, "Finding teacher");
  pool.query("SELECT * FROM teachers WHERE ?", query, (error, data) => {
    if (error) {
      log.error(error);
      cb(true, {});
      return;
    }

    cb(false, data)
  })
}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    createSchool: createSchool,
    createTeacher: createTeacher,
    updateSchool: updateSchool,
    updateTeacher: updateTeacher,
    findSchool: findSchool,
    findTeacher: findTeacher
  }
}
