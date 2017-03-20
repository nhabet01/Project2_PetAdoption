// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var User = sequelize.define("user", {
  user_acctno: {
    type: Sequelize.INTEGER
  },
  user_password: {
    type: Sequelize.INTEGER
  },
  user_name: {
    type: Sequelize.STRING
  },
  user_email: {
    type: Sequelize.STRING
  },
  user_phone: {
    type: Sequelize.INTEGER
  },
  user_addr1: {
    type: Sequelize.STRING
  },
  user_addr2: {
    type: Sequelize.STRING
  },
  user_addr3: {
    type: Sequelize.STRING
  },
  user_typepref: {
    type: Sequelize.STRING
  },
  user_agepref: {
    type: Sequelize.STRING
  },
  user_sizepref: {
    type: Sequelize.STRING
  },
  user_genderpref: {
    type: Sequelize.STRING
  }
}
);

// Syncs with DB
User.sync();

// Makes the User Model available for other files (will also create a table)
module.exports = User;