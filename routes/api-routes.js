var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


  // POST route for saving a new post
  app.post("/api/newUser", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json

    db.Post.create({
      name: req.body.name,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      zip: req.body.zip,
      animal: req.body.animal,
      age: req.body.age,
      gender: req.body.gender
    })
    .then(function(dbPost) {res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/updateUser", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json

    db.Post.update(
    {req.body,
      where: {
        name: req.params.name
      }
    })
    .then(function(dbPost) {
      return res.json(dbPost);
    });
  });

};