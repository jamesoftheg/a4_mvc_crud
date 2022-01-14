/**
 * "StAuth10222: I James Gelfand, 000275852 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */

var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
}

startup();

// Return all of the users
async function getAllUsers()
{
  const results = db.all("SELECT * FROM Users");
  return results;
}

// Create a new article given a title, content and username
async function deleteUser(username)
{ 
  deleteStatement = "DELETE FROM Users WHERE username = '" + username + "'";
  await db.run(deleteStatement);
}

module.exports = {getAllUsers, deleteUser};
