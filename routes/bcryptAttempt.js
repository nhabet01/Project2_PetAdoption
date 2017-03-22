var bcrypt = require("bcrypt");

//Option 1: insert bcrypt code directly into the password field. Get error : notNull Violation: password cannot be null...so hash wasn't passed to the password

router.post("/signup", function(req, res) {
    console.log('SIGNUP')
    //Default saltRounds is 10 but the higher that number the more computaionally costly; will set lower for dev purposes.
    const saltRounds = 4;

    // console.log(req.body)

        //this will go to our db 
    db.user.create({//nh why does "user" have to be lowercase?
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hash(req.body.password, saltRounds, function(err, hash) { //entered "4" instead of "saltRounds" in case it was a scope issue but same error returned
        return hash;
        }),
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


// Option2: create "password" outside of .create command and pass in the password: No error, but the hashed password is not passed through.
router.post("/signup", function(req, res) {
    console.log('SIGNUP')
    //Default saltRounds is 10 but the higher that number the more computaionally costly; will set lower for dev purposes.
    const saltRounds = 4;
    const myPlaintextPassword = req.body.password;
    const mypassword="";
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    mypassword = hash;
    });

    // console.log(req.body)

        //this will go to our db 
    db.user.create({//nh why does "user" have to be lowercase?
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