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
  if (!username) { return; }

  var res = {
    error: false,
    msg: null
  }

  var putParams = {
    Item: {
      "username": { S: username }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "sejong-demographics"
  }

  for (let key in data) {
    putParams.Item[key] = { S: data[key] }
  }

  pool.putItem(putParams, (err, data) => {
    if (err) {
      console.log(err);
      res.error = true;
      res.status = "Unknown error";
      cb(res);
      return;
    }

    res.status = "Updated demographics";
    cb(res);
  })
}

module.exports = function(connectionPool) {
  pool = connectionPool;
  return {
    read: readDemographics,
    update: updateDemographics
  }
}
