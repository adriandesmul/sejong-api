function createSchool(school, cb, log) {
  log.info({school: school}, "[MOCK] Saved new school");
  cb(false, {school_id: 5})
}

function createTeacher(school_id, teacher, cb, log) {
  log.info({school_id: school_id, teacher: teacher}, "[MOCK] Saved new teacher");
  cb(false, {teacher_id: 7})
}

function updateSchool(school, cb, log) {
  log.info({school: school}, "[MOCK] Updated school");
  cb(false, null)
}

function updateTeacher(teacher, cb, log) {
  log.info({teacher: teacher}, "[MOCK] Updated teacher");
  cb(false, null)
}

function findSchool(query, cb, log) {
  log.info(query, "[MOCK] Finding school");
  if (query['school_id'] == "5") {
    cb(false, [{
      school_name: "New Trier",
      school_city: "Wilmette",
      school_state: "IL",
      school_country: "USA",
      school_zip: "60091",
      school_id: 5
    }]);
    return;
  }

  if (query["school_id"] == "2") {
    cb(false, []);
    return;
  }

  cb(false, [{
    school_name: "New Trier",
    school_city: "Wilmette",
    school_state: "IL",
    school_country: "USA",
    school_zip: "60091",
    school_id: 5
  }, {
    school_name: "Highcrest",
    school_city: "Wilmette",
    school_state: "IL",
    school_country: "USA",
    school_zip: "60091",
    school_id: 5
  }]);
  return;
}

function findTeacher(query, cb, log) {
  log.info(query, "[MOCK] Finding school");
  if (query["school_id"] == "5") {
    cb(false, [{
      school_id: 5,
      teacher_id: 1,
      teacher_name: "Ms. Li",
      teacher_email: "li@school.com"
    }, {
      school_id: 5,
      teacher_id: 2,
      teacher_name: "Ms. Kim",
      teacher_email: "kim@school.com"
    }])
  } else {
    cb(false, [])
  }
}

module.exports = function() {
  return {
    createSchool: createSchool,
    createTeacher: createTeacher,
    updateSchool: updateSchool,
    updateTeacher: updateTeacher,
    findSchool: findSchool,
    findTeacher: findTeacher
  }
}
