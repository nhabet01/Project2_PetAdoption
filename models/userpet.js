// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Userpet" model that matches up with DB
var Userpet = sequelize.define("userpet", {
  userpet_acctno: {
    type: Sequelize.INTEGER
  },
  userpet_pet_id: {
    type: Sequelize.STRING
  },
  userpet_pet_zip: {
    type: Sequelize.INTEGER
  }
}
);

// Syncs with DB
Userpet.sync();

// Makes the Userpet Model available for other files (will also create a table)
module.exports = Userpet;