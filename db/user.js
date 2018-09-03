var pool = null;

function createUser() {
  console.log("Create user")
  console.log(pool)
}

function readUser() {

}

function updateUser() {

}

function deleteUser() {

}

module.exports = function(connectionPool) {
  pool = connectionPool;
  console.log(pool);
  return {
    create: createUser,
    read: readUser,
    update: updateUser,
    delete: deleteUser
  }
}
