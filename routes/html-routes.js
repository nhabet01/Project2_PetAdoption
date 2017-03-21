const express = require("express");
const router = express.Router();
const api = require("./api-routes.js");
const db = require("../models/");
var bcrypt = require("bcrypt");
    // Routes
    // =============================================================


router.get('/', (req, res) => {


    var data = {
        hello: ' World'
    }

    res.render('main', data);

});

router.get('/signup', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('signup', data);

});

router.get('/login', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('login', data);

});

router.post("/signup", function(req, res) {
    console.log('SIGNUP')
    //Default saltRounds is 10 but the higher that number the more computaionally costly; will set lower for dev purposes.
    const saltRounds = 4;
    // const myPlaintextPassword = req.body.password;
    var mypassword;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    mypassword = hash;
    });

    // console.log(req.body)

        //this will go to our db 
    db.user.create({//nh why does "user" have to be lowercase? in a similar example for in class exercises we used db.Post and db.Books.create
        name: req.body.name,
        username: req.body.username,
        password: mypassword,
        email: req.body.email


    }).then(function(data) {

        var data = { data: data }
        // console.log("data");
        // console.log(data);
        res.render('animalSearch', data)
        //above should render the animalSearch handlebars and it does, but the address is still "signup" in the browser addressbar
        //also, data is not being rendered on that page (don't think it should if data = user signup info)
    })


});

router.post("/login", function(req, res) {
    console.log('LOGIN')

    console.log(req.body)

});


// router.get('/post', (req, res) => {
//     console.log(req.body)
//         // var data = {
//         //     hello: ' World'
//         // }
//         // res.render('login', data);

// });

router.get('/search', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('animalSearch', data);

});

router.post('/search', (req, res) => {
    console.log('BODY')
    console.log(req.body)
    api.findAminals(req.body, function(data) {
        console.log('FUNN')
            // console.log(data)
        res.render('petsOnSearch', { pets: data });
    })


});







// router.post("/", function(req, res) {
//     console.log('Hello')

//     console.log(req.body)
//         // cat.create([
//         //     "name", "sleepy"
//         // ], [
//         //     req.body.name, req.body.sleepy
//         // ], function() {
//         //     res.redirect("/");
//         // });
// });

module.exports = router;