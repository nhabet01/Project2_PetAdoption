const express = require("express");
const router = express.Router();
const apiMain = require("./animalSearchFunction.js")
const db = require("../models/")
var bcrypt = require('bcrypt');
const saltRounds = 4;
var zipcode = require('zipcode');
// var Saltedpass = ' '

// Routes

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

//=================GET ROUTES========================================
//main.handlebars handler (within views not layouts...should change name)
router.get('/', (req, res) => {


    var data = {
        hello: ' World'
    }

    res.render('main', data);

});
//signup.handlebars handler
router.get('/signup', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('signup', data);

});
//login.handlebars handler
router.get('/login', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('login', data);

});

//animalSearch.handlbars handler
//Search page only accessible to users who have signed up
router.get('/search/:username', (req, res) => {
    console.log(req.params.username);


    db.User.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(data) {

        var params = data.dataValues
        console.log(params);
            // res.render('animalSearch', { pets: data });
            //call findAnimals from within /routes/animalSearchFunction.js
        res.render('animalSearch', { data: params });
    })


});

//petsOnSearch.handlebars handler
router.get('/foundAnimals/:username', function(req, res) {// if add "isAuthenticated," before "function" then the logout works and prevents anyone getting to the foundAnimals page. however, prevented even if user logs in. I think it is an issue with the /username route.
    db.User.findOne({
        where: {
            username: req.params.username
        }
    }).then(function(data) {

        var params = data.dataValues

        //call findAnimals from within /routes/animalSearchFunction.js
        apiMain.findAminals(params , function(data) {//nh: function(data)=cb in animalSearchFunction.js
            console.log('FUNN')
                // console.log(data)
                //{pets:data} pets is the handler passed to handlebars, data is the info to be displayed.
            res.render('petsOnSearch', { pets: data });
        })

    })

});





// ====================POST ROUTES================================
router.post("/signup", function(req, res) {
    console.log('SIGNUP')

    console.log(req.body)


    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        // console.log(hash)

        db.User.create({
                name: req.body.name,
                username: req.body.username,
                password: hash,
                email: req.body.email


            }).then(function(data, err) {
                // console.log(data.dataValues)
                console.log(err)
                console.log('good')
                res.redirect(`/search/${data.dataValues.username}`)
                    // res.redirect('/', data.dataValues.username)
            })
            .catch(function(error) {
                    if (error) {
                        console.log(error.message)
                        var data = { baderror: error.message }
                        res.render('signup', data)
                    }


                }



            );



    });
});



router.post("/login", function(req, res) {
    console.log('LOGIN')

    console.log(req.body.username);
    console.log(req.body.password);
    db.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(data) {
        if (data) {
            // console.log("data.dataValues.password:");
            // console.log(data.dataValues.password);
            // console.log("--------");
            // console.log("data.dataValues:")
            console.log(data.dataValues)
            if (bcrypt.compareSync(req.body.password, data.dataValues.password)) {
                //if statement takes care of async version of bcrypt.compare
                res.redirect(`/search/${data.dataValues.username}`)

            } else {

                res.render('login', { wrongData: 'Wrong Password!' })
                console.log('Password Wrong')
            }
        } else {
            res.render('login', { wrongData: 'User does not exists!' })
            console.log('User Do Not exists')
        }


    })

});


router.post('/search/:username',  function(req, res) {// if add "isAuthenticated," before "function" then the logout works and prevents anyone getting to the foundAnimals page. however, prevented even if user logs in. I think it is an issue with the /username route.
    console.log(req.params.username)
    console.log('BODY')
    console.log(req.body)

    var newzip = zipcode.lookup(req.body.zip);
    if (newzip == null) {
        console.log("zip is invalid");
        return
    }



    // animal | age  | gender
    db.User.update({ zip: req.body.zip, animal: req.body.animalType, age: req.body.animalAge, gender: req.body.animalSex }, {
        where: { username: req.params.username }
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