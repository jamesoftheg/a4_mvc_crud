/**
 * "StAuth10222: I James Gelfand, 000275852 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */

const express = require('express');
var router = express.Router()
const ArticlesModel = require('../models/articles.js')
const UsersModel = require('../models/users.js')

// Display the editors page
router.get("/", async function(req, res)
{
    // Retrieve all of the articles using the model method, display the page
    const articleResults = await ArticlesModel.getAllArticles();
    req.TPL.articles = articleResults;
    // Retrieve all of the users using the model method, display the page
    const userResults = await UsersModel.getAllUsers();
    req.TPL.users = userResults;
  res.render("editors", req.TPL);
});

// Delete an article
router.post("/deleteArticle", async function(req, res)
{
  await ArticlesModel.deleteArticle(req.body.deletedArticle);

  req.TPL.message = "Article successfully deleted!";

  // Retrieve all of the articles using the model method, display the page
  const articleResults = await ArticlesModel.getAllArticles();
  req.TPL.articles = articleResults;
  // Retrieve all of the users using the model method, display the page
  const userResults = await UsersModel.getAllUsers();
  req.TPL.users = userResults;
  res.render("editors", req.TPL);
});

// Delete a user
router.post("/deleteUser", async function(req, res)
{
  await UsersModel.deleteUser(req.body.deletedUser);
  await ArticlesModel.deleteAllArticle(req.body.deletedUser);

  req.TPL.message = "User successfully deleted!";

  // Retrieve all of the articles using the model method, display the page
  const articleResults = await ArticlesModel.getAllArticles();
  req.TPL.articles = articleResults;
  // Retrieve all of the users using the model method, display the page
  const userResults = await UsersModel.getAllUsers();
  req.TPL.users = userResults;
  res.render("editors", req.TPL);
});

module.exports = router;
