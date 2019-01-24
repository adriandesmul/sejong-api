var pool = null;

function readDemographics(user_id, keys, cb, log) {
  if (!user_id) { return; }

  var res = {
    error: false,
    data: null
  }

  pool.query("SELECT * FROM demographics WHERE user_id = ?", [
    user_id
  ], (error, data) => {
    if (error) {
      log.error(error);
      res.error = true;
      cb(res);
      return;
    }

    if (data[0] && data[0].demographics_id) {
      res.data = data[0];
      cb(res);
      return;
    }

    res.error = true;
    cb(res);

  })
}

function updateDemographicsCallback(error, data, cb, log) {

  if (error) {
    log.error(error);
    cb({
      error: true,
      msg: "Unknown error"
    })
    return;
  }

  cb({
    error: false,
    msg: "Save successful"
  })

}

function updateDemographics(user_id, demographics, cb, log) {
  if (!user_id) { return; }

  var res = {
    error: false,
    msg: null
  }

  demographics.user_id = user_id;

  pool.query("SELECT demographics_id FROM demographics WHERE user_id = ?",
    [user_id], (error, data) => {

    if (error) {
      log.error(error)
      res.error = true;
      res.msg = "Unknown error"
      cb(res);
      return;
    }

    if (data[0] && data[0].demographics_id) {
      pool.query("UPDATE demographics SET ? WHERE demographics_id = ?", [
        demographics,
        data[0].demographics_id
      ], (error, data) => {
        updateDemographicsCallback(error, data, cb, log);
      })
    } else {
      pool.query("INSERT INTO demographics SET ?", [
        demographics
      ], (error, data) => {
        updateDemographicsCallback(error, data, cb, log);
      })
    }
  })
}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
