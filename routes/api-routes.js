// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

 // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    req.logOut();//stackoverflow suggested "O" for logOut...still doesn't work
    req.session.destroy(function(){
        res.clearCookie('connect.sid');
        res.redirect("/");  
    });  //nh: do we need? 
    
  });


};