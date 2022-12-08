// delete our database of users
// import our db
const db = require('../config/connection');
// import our User model
const { User } = require('../models');

// clear users
async function deleteAllUsers() {
  const deletedUsers = await User.deleteMany();
  console.log(deletedUsers);
  db.close();
}

deleteAllUsers();
