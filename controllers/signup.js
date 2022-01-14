/**
 * "StAuth10222: I James Gelfand, 000275852 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else."
 */

const express = require('express');
var router = express.Router()

// Open the database
const sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.signup_error = req.session.signup_error;
  req.session.signup_error = "";

  // if we had an error during form submit, display it, clear it from session
  req.TPL.signup_success = req.session.signup_success;
  req.session.signup_success = "";

  // render the login page
  res.render("signup", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptsignup", async function(req, res)
{
    let query = "SELECT INTO Users (username, password) VALUES (username, password)";
    let username = req.body.username;
    let password = req.body.password;

    // insert one row into the langs table
    if (username.length >= 1 || password.length >= 1) {
      db.run("INSERT INTO Users (username, password, level) VALUES (?, ?, ?)", [username, password, "member"], function(err) {
        if (err) {
            return console.log(err.message);
        } else {
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
          // close the database connection
          db.close();
          // if we have an error, reload the login page with an error
          req.session.signup_success = "User account created! Login to access your new account.";
          res.redirect("/signup");
        }

        });
    } else {
      // if we have an error, reload the login page with an error
      req.session.signup_error = "Invalid username and/or password!";
      res.redirect("/signup");
    }
});

module.exports = router;
