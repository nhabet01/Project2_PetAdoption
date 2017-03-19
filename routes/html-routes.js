const express = require("express");
const router = express.Router();

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