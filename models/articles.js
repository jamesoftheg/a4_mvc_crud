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

// Return all of the articles
async function getAllArticles()
{
  const results = db.all("SELECT * FROM Articles");
  return results;
}

// Create a new article given a title, content and username
async function createArticle(article, username)
{ 
  await db.run("INSERT INTO Articles VALUES (?,?,?)",
               [article.title, username, article.content]);
}

// Create a new article given a title, content and username
async function deleteArticle(title)
{ 
  console.log(title);
  escapedTitle = title.replace(/\'/g,"''");
  title=title.replace("'","''");
  deleteStatement = "DELETE FROM Articles WHERE title like '" + title + "'";
  await db.run(deleteStatement);
}

// Create a new article given a title, content and username
async function deleteAllArticle(username)
{ 
  deleteStatement = "DELETE FROM Articles WHERE username = '" + username + "'";
  await db.run(deleteStatement);
}

module.exports = {getAllArticles
                 ,createArticle 
                 ,deleteArticle
                 ,deleteAllArticle};
