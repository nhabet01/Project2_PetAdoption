const express = require("express");
const router = express.Router();
const apiMain = require("./animalSearchFunction.js")
const db = require("../models/")
var bcrypt = require('bcrypt');
const saltRounds = 4;
var zipcode = require('zipcode');
var path = require('path');
// var Saltedpass = ' '


// Routes



//=================GET ROUTES========================================
//main.handlebars handler (within views not layouts...should change name)

//once the person looged out we close its session! 
router.get('/logout', function(req, res) {

    req.session.logged_in = false;
    req.session.destroy(function() {
        res.sendFile(path.join(__dirname, "/../views/main.handlebars"));
        // res.redirect("/");
    });
})



router.get('/', (req, res) => {

    // var data = {
    //     hello: ' World'
    // }

    // res.render('main', data);
    // console.log(path.join(__dirname, "../../views/main.handlebars"))
    res.render(path.join(__dirname, "/../views/main.handlebars"));

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


    // IF THE PERSON LOGGED IN THEN WE CAN ONLY ACCES DATA!
    if (req.session.logged_in && req.session.user_name == req.params.username) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(data) {

            var params = data.dataValues
            console.log(params)
                // res.render('animalSearch', { pets: data });
                //call findAnimals from within /routes/animalSearchFunction.js
            res.render('animalSearch', { data: params }); //nh: render requires you have a handle
        })

    } else {

        res.send('unauthorized!')
    }
});

//petsOnSearch.handlebars handler
router.get('/foundAnimals/:username', (req, res) => {

    // if person LOGGED IN THEN WE CAN ONLY ACCES THE DATA!!!!
    if (req.session.logged_in && req.session.user_name == req.params.username) {
        // if we create boolean here???//
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(data) {

            var params = data.dataValues
                //call findAnimals from within /routes/animalSearchFunction.js
            apiMain.findAminals(params, function(data) { //nh: function(data)=cb in animalSearchFunction.js
                console.log('FUNN')
                var userobj = {
                    username: params.username,
                    userid: params.id
                }
                console.log("userobj:" + userobj.username + "-" + userobj.userid)
                    // console.log(data)
                    //{pets:data} pets is the handler passed to handlebars, data is the info to be displayed.
                res.render('petsOnSearch', { pets: data, user: userobj });
            })

        })
    } else {
        //we can create some cool unauthorized page! 
        res.send('unauthorized')
    }
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

                // when person sigins up we authorize it
                //and have acces to email and username NOT password keep it hashED
                req.session.logged_in = true;
                req.session.user_name = req.body.username;
                req.session.user_email = req.body.email;


                // we give a session token  and user has access to it during the visit until they log out! 
                res.redirect(`/search/${req.session.user_name}`)
                    // res.redirect('/', data.dataValues.username)
            })
            .catch(function(error) {
                if (error) {
                    console.log(error.message)
                    var data = { baderror: error.message }
                    res.render('signup', data)
                }

            });
    });
});



router.post("/login", function(req, res) {
    console.log('LOGIN')

    console.log(req.body.username);
    // console.log(req.body.password);
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
            console.log('DATA FROM LOGGING IN')
            console.log(data.dataValues)
            if (bcrypt.compareSync(req.body.password, data.dataValues.password)) {
                //if statement takes care of async version of bcrypt.compare
                // we turn session on  ! 
                //we have acces to username  ID and email! 

                req.session.logged_in = true
                    //for each session we will have uniqe key which is and ID and is a foreign key! 
                req.session.user_id = data.dataValues.id; // we can use this id to do the favorite animals! 
                req.session.user_name = data.dataValues.username;
                req.session.user_email = req.body.email;


                //and we pass our session to search! 
                res.redirect(`/search/${req.session.user_name}`)

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


router.post('/search/:username', (req, res) => {
    //CHECK POINT IF USER LOGGED IN 
    if (req.session.logged_in && req.session.user_name == req.params.username) {
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

    }
    //we have to do else here { boo unauthorized! }

});




//================ If no matching route is found default to home====================
// router.use(function(req, res) {

//---gilbert's 
router.post("/favAnimals", function(req, res) {
    console.log('Inserting favorited pet one at a time in the background....');
    //console.log(`petid: ${petId} username: ${username}  userid: ${userid}`);
    // console.log(req.body);
    var str = req.body.favorite;
    var str2 = str.slice(str.indexOf("$") + 1);
    var petid = str.slice(0, str.indexOf("$"));
    var usrid = str2.slice(0, str2.indexOf("$"));
    var usrname = str2.slice(str2.indexOf("$") + 1);
    console.log(`petid=${petid}`);
    console.log(`usrid=${usrid}`);
    console.log(`usrname=${usrname}`);
    var userid = parseInt(usrid);

    db.Favorites.findOne({
        where: {
            animalID: petid,
            UserId: userid
        }
    }).then(function(data) {
        if (data) {
            console.log(" this favorite already exists...");
        } else {
            db.Favorites.create({
                animalID: petid,
                UserId: userid
            }).then(function(data) {
                // console.log(data);
                console.log(" this favorite is added...");
            });
        }

    })

});

//     res.redirect("/");
// });
// ===================tried code below as well but doesn't recognize the path/file================
router.use(function(req, res) {
    //     var data = {
    //     hello: ' World'
    // }
    res.render(path.join(__dirname, "/../views/main.handlebars"));
});

//================ If no matching route is found default to home====================
// router.use(function(req, res) {
module.exports = router;