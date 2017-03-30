const express = require("express");
const router = express.Router();
const apiMain = require("./animalSearchFunction.js")
const db = require("../models/")
var bcrypt = require('bcrypt');
const saltRounds = 4;
var zipcode = require('zipcode');
var path = require('path');
var chalk = require('chalk');

//=================GET ROUTES========================================

//once the person logs out we close their session! 
router.get('/logout', function(req, res) {

    req.session.logged_in = false;
    req.session.destroy(function() {
        res.redirect("/");
    });
})


//home.handlebars handler 
router.get('/', (req, res) => {

    res.render(path.join(__dirname, "/../views/home.handlebars"));

});

//contact.handlebars handler
router.get('/contact', (req, res) => {
    var data = {
        hello: ' World'
    }
    res.render('contact',data);
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
router.get('/search/:username', (req, res) => {
    console.log('I WAS SEARCHING')
    console.log(req.params.username);


    //Search page only accessible to users who have logged in
    if (req.session.logged_in && req.session.user_name == req.params.username) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(data) {
            //note: must use data.dataValues rather than simply "data"
            var params = data.dataValues
            console.log(params)
            //nb: render requires you have a handle
            res.render('animalSearch', { data: params }); 
        })

    } else {
        //future work: create 404 page
        res.send('unauthorized!')
    }
});

//"favorites" handler (returns search page)
router.get('/favorites/:username', (req, res) => {

    if (req.session.logged_in && req.session.user_name == req.params.username) {
       
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(data) {

            var params = data.dataValues
            var userobj = {
                username: params.username,
                userid: params.id
            }
            var favs;

            db.Favorites.findAll({
                where: {
                    UserId: params.id
                }
            }).then(function(FavsData) {

                if (FavsData.length > 0) {

                    let IDs = FavsData.map(favobject => `${favobject.animalID}`);
                    apiMain.findfav(IDs, function(FavsDataReturn) {
                        //with CB we have result as an array and we can render it on the page. 
                        favs = FavsDataReturn
                        res.render('petsOnSearch', { favs: favs, user: userobj });
                    })

                } else {

                    res.render('petsOnSearch', { Nofavs: 'No Favorites yet!', user: userobj });
                }
            })
        })
    } else {
        res.send('unauthorized')
    }

})


//petsOnSearch.handlebars handler
router.get('/foundAnimals/:username', (req, res) => {

    // page only accessible to users who have logged in
    if (req.session.logged_in && req.session.user_name == req.params.username) {
        db.User.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(data) {

            var params = data.dataValues

            //call findAnimals from within /routes/animalSearchFunction.js
            apiMain.findAminals(params, function(data) { 
                //nh: function(data)=cb in animalSearchFunction.js
                console.log('FUNN')
                console.log(data);
                var userobj = {
                        username: params.username,
                        userid: params.id
                    }
                res.render('petsOnSearch', { pets: data, user: userobj });
                //{pets:data} pets is the handler passed to handlebars, data is the info to be displayed.
            })

        })
    } else {
        res.send('unauthorized')
    }
});

// ====================DELETE================================
//Allows removal of individual favorites:
router.delete('/favorites/:userId/:userName/:petid', (req, res) => {

    console.log(req.params)
    console.log('DESTROY')
    db.Favorites.destroy({
        animalID: req.params.petid,
        where: {
            animalID: req.params.petid,
            UserId: req.params.userId
        }
    }).then(function(done) {

        res.redirect(`/favorites/${req.params.userName}`)
    })

})



// ====================POST ROUTES================================
//Post route for signing up new users
router.post("/signup", function(req, res) {
    console.log('SIGNUP')

    console.log(`username: ${req.body.username}  email: ${req.body.email}`);
    if (req.body.password != req.body.confirm) {
        
        res.render('signup', { BadPassword: 'Your password does not match!' })
    }
    else {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

            db.User.create({
                    name: req.body.name,
                    username: req.body.username,
                    password: hash,
                    email: req.body.email


            }).then(function(data, err) {
                    // console.log(data.dataValues)
                    // if (err){
                    // console.log("email or username check in html-routes:")
                    // console.log(err)
                    // var err = {error :err}
                    // res.render('signup',{BadPassword:err})
                    // }   


                    // when a person signs up we authorize a session
                    //and have acces to email and username NOT password--keep it hashed
                    req.session.logged_in = true;
                    req.session.user_name = req.body.username;
                    req.session.user_email = req.body.email;


                    // we give a session token  and user has access to it during the visit until they log out! 
                    res.redirect(`/search/${req.session.user_name}`)
                        
            }).catch(function(error) {
                if (error) {
                    console.log(error)
                    console.log(error.message)


                    if (error.message.includes('Validation error:')) {
                        error.message = error.message.slice(17)
                    }
                    var data = { baderror: error.message }
                    res.render('signup', data)
                    
                                             
                }
            });
        });
    }
});


//Post route for loggin in existing users
router.post("/login", function(req, res) {
    console.log('LOGIN')

    console.log(req.body.username);
    
    db.User.findOne({
        where: {
            username: req.body.username
        }
    }).then(function(data) {
        if (data) {
            console.log('DATA FROM LOGIN')
            console.log(data.dataValues)
            if (bcrypt.compareSync(req.body.password, data.dataValues.password)) {
                //if statement takes care of async version of bcrypt.compare
                
                // we turn session on 
                //we have acces to username  ID and email! 
                req.session.logged_in = true
                //for each session we will have uniqe key which is userID and is a foreign key 
                // we can use this id to link to favorite animals
                req.session.user_id = data.dataValues.id; 
                req.session.user_name = data.dataValues.username;
                req.session.user_email = req.body.email;


                //and we pass our session to search 
                res.redirect(`/search/${req.session.user_name}`)

            } else {

                res.render('login', { wrongData: 'Wrong Password!' })
                console.log('Wrong Password');
            }
        } else {
            res.render('login', { wrongData: 'User does not exists!' })
            console.log('User Does Not exists');
        }
    })
});

//Post route for "searching" the api; data sent to foundAnimals and call made there.
router.post('/search/:username', (req, res) => {
    //Check Point
    if (req.session.logged_in && req.session.user_name == req.params.username) {
        console.log(req.params.username)
        console.log('BODY')
        console.log(req.body)

        var newzip = zipcode.lookup(req.body.zip);
        if (newzip == null) {
            console.log("zip is invalid");
            return
        }

        db.User.update({ zip: req.body.zip, animal: req.body.animalType, age: req.body.animalAge, gender: req.body.animalSex }, {
            where: { username: req.params.username }
        }).then(function(result) {
            res.redirect(`/foundAnimals/${req.params.username}`)
        })
    }
});

//Post route for adding favorites 
router.post("/favAnimals", function(req, res) {

    var str = req.body.favorite;
    console.log('req.body.favorite:');
    console.log(req.body.favorite);
    console.log('=============');
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
            res.redirect(`/foundAnimals/${usrname}`)
        } else {
            db.Favorites.create({
                animalID: petid,
                UserId: userid
            }).then(function(data) {
                // console.log(data);
                console.log(" this favorite has been added");
                res.redirect(`/foundAnimals/${usrname}`)
            });
        }

    })

});

//================ If no matching route is found default to home====================
router.use(function(req, res) {
 
    res.render(path.join(__dirname, "/../views/home.handlebars"));
});

module.exports = router;