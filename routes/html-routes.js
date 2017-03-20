const express = require("express");
const router = express.Router();
const api = require("./api-routes.js")
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

router.get('/search', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('animalSearch', data);

});

router.post('/search', (req, res) => {

    // console.log(req.body)
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