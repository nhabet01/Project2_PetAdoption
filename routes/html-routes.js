const express = require("express");
const router = express.Router();
const api = require("./api-routes.js")
const db = require("../models/")
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

    console.log(req.body)
        //this will go to our db 
    db.user.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email


    }).then(function(data) {

        var data = { data: data }
        res.render('animalSearch', data)
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