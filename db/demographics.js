var pool = null;

function readDemographics(username, keys, cb) {
  if (!username) { return; }

  var res = {
    error: false,
    data: null
  }

  var getParams = {
    Key: {
      "username": { S: username }
    },
    TableName: "sejong-demographics"
  }

  pool.getItem(getParams, (err, data) => {
    if (err) {
      console.log(err);
      res.error = true;
      cb(res);
      return;
    }

    var returnObj = {};

    for (let key of keys) {
      returnObj[key] = (data.Item && data.Item[key]) ? data.Item[key].S || ''
    }

    res.data = returnObj;
    cb(res);

  })
}

function updateDemographics(username, data, cb) {

}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
