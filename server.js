//Add dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
//bcrypt used for validaton
var bcrypt = require('bcrypt');
var path = require('path')
//cookieParser and session used for session tokens
var cookieParser = require('cookie-parser');
var session = require('express-session');

// Sets up the Express App
// =============================================================
var app = express();

//allow sessions
app.use(session({
    secret: 'app',
    cookie: { maxAge: 6 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
//Deploy in current environment or 8080
var PORT = process.env.PORT || 8080;


// Requiring our models for syncing
var db = require("./models");

// Middleware
//Use of "static" makes our public folder inaccessible via the browser
app.use("/static/", express.static(path.join(__dirname, "/public/")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

//Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes 
//=============================================================

const HTMLRouter = require("./routes/html-routes.js");

app.use('/', HTMLRouter);

// Syncing our sequelize models and then starting our express app

db.sequelize.sync({ force: false }).then(function(data, error) {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});