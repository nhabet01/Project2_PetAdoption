var path = require("path");

//in exports, want to pass in parameter app which refers to express()
module.exports = function(app){

    //no specific url given here b/c we want user to be directed home in any non predefined situation
    app.use(function(req,res){
        var data = {
            hello: ' World'
        }
        res.render('main', data);
    });

  

};