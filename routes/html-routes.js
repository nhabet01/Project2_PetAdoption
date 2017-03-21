const express = require("express");
const router = express.Router();
const apiMain = require("./animalSearchFunction.js")
const db = require("../models/")
var bcrypt = require('bcrypt');
const saltRounds = 10;
var Saltedpass = ' '
    // Routes
    // =============================================================

//     bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//             console.log
// });


//=================GET ROUTES
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

router.get('/search/:username', (req, res) => {
    console.log(req.params.username);

    var data = {
        username: req.params.username
    }
    res.render('animalSearch', data);

});

router.get('/foundAnimals/:username', (req, res) => {
            db.user.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(data){

var params = data.dataValues
    apiMain.findAminals(params , function(data) {
        console.log('FUNN')
            console.log(data)
        res.render('petsOnSearch', { pets: data });
    })
        
        // console.log(data.dataValues)
        // res.send(data.dataValues)
    })

    // console.log(req.params.username);

    // var data = {
    //     username: req.params.username
    // }
    // res.render('animalSearch', data);

});





// ====================POST ROUTS
router.post("/signup", function(req, res) {
    console.log('SIGNUP')

    console.log(req.body)


    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // console.log(hash)

        db.user.create({
            name: req.body.name,
            username: req.body.username,
            password: hash,
            email: req.body.email


        }).then(function(data) {
            // console.log(data.dataValues)

             res.redirect(`/search/${data.dataValues.username}`)
            // res.redirect('/', data.dataValues.username)
        })


    });
});



router.post("/login", function(req, res) {
    console.log('LOGIN')

    console.log(req.body.username);
    console.log(req.body.password);
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(data) {
        if (data) {
            // console.log(data.dataValues.password)
            // console.log(data.dataValues)
            if (bcrypt.compareSync(req.body.password, data.dataValues.password)) {
                // var user = { user: data.dataValues }
                // console.log(user.id)
                // res.render('animalSearch', data.dataValues)
    res.redirect(`/search/${data.dataValues.username}`)
                
            } else {
                res.redirect('/login')
                console.log('Password Wrong')
            }
        } else {
            res.redirect('/login')
            console.log('User Do Not exists')
        }


    })

});


router.post('/search/:username', (req, res) => {
    console.log(req.params.username)
    console.log('BODY')
    console.log(req.body)
    // animal | age  | gender
     db.user.update({ zip: req.body.zip , animal: req.body.animalType , age: req.body.animalAge ,gender: req.body.animalSex },
     {
         where : { username : req.params.username}
     }).then(function(result) {
            // now you see me...
            console.log(result)
            res.redirect(`/foundAnimals/${req.params.username}`)
        })
            //No need anymore!
    // api.findAminals(req.body, function(data) {
    //     console.log('FUNN')
    //         // console.log(data)
    //     res.render('petsOnSearch', { pets: data });
    // })


});


// router.post('/search/:username', (req, res) => {
//     console.log(req.params.username);
//     res.redirect(`/foundAnimals/${req.params.username}`);

// });



module.exports = router;