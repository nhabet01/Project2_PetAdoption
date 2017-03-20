// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Pet" model that matches up with DB
var Pet = sequelize.define("pet", {
  pet_id: {
    type: Sequelize.STRING
  },
  pet_zip: {
    type: Sequelize.INTEGER
  },
  pet_name: {
    type: Sequelize.STRING
  },
  pet_type: {
    type: Sequelize.STRING
  },
  pet_breed: {
    type: Sequelize.STRING
  },
  pet_gender: {
    type: Sequelize.STRING
  },
  pet_size: {
    type: Sequelize.STRING
  },
  pet_age: {
    type: Sequelize.STRING
  },
  pet_photo: {
    type: Sequelize.STRING
  },
  pet_contact1: {
    type: Sequelize.STRING
  },
  pet_contact2: {
    type: Sequelize.STRING
  },
  pet_contact3: {
    type: Sequelize.STRING
  },
  pet_contact4: {
    type: Sequelize.STRING
  },
  pet_contact5: {
    type: Sequelize.STRING
  },
  pet_status: {
    type: Sequelize.STRING
  }
}
);

// Syncs with DB
Pet.sync();

// Makes the Pet Model available for other files (will also create a table)
module.exports = Pet;