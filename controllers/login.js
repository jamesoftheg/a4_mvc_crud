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
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // render the login page
  res.render("login", req.TPL);
});

// Attempts to login a user
// - The action for the form submit on the login page.
router.post("/attemptlogin", async function(req, res)
{
  let query = "SELECT * FROM Users WHERE username  = ? and password = ?";
  let username = req.body.username;
  let password = req.body.password;

  db.get(query, [username, password], (err, row) => {

      console.log(row);
      if(row != undefined && row.username == username && row.password == password) {
        // set a session key username to login the user
        req.session.username = req.body.username;
        req.session.level = row.level;
        console.log(req.session.level);
        console.log(row.level);

        if (row.level == "member") {
          // re-direct the logged-in user to the members page
          res.redirect("/members");
        }
        if (row.level == "editor") {
          // re-direct the logged-in user to the members page
          res.redirect("/editors");
        }
      }
      else if (username == "" || password == "") {
        // if we have an error, reload the login page with an error
        req.session.login_error = "Username/password cannot be blank!";
        res.redirect("/login");
      }
      else if (row == undefined) {
        // if we have an error, reload the login page with an error
        req.session.login_error = "Invalid username and/or password!";
        res.redirect("/login");
      }
      else {
        // if we have an error, reload the login page with an error
        req.session.login_error = "Invalid username and/or password!";
        // res.redirect("/login");
        res.redirect("/login");
      }
  });

});

// Logout a user
// - Destroys the session key username that is used to determine if a user
// is logged in, re-directs them to the home page.
router.get("/logout", async function(req, res)
{
  delete(req.session.username);
  delete(req.session.level);
  res.redirect("/home");
});

module.exports = router;
