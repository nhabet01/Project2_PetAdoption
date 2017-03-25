<<<<<<< HEAD
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
=======
var bcrypt = require("bcrypt");
var validator = require('validator');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            //sequelize automatically adds ID as primary key and auto increments

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            username: {

                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            //This can be generated using javascript/jQuery from a combination of user inputs and sign-up
            // acctName: {
            //     type: DataTypes.STRING
            // },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true, //checks for email format (foo@bar.com) via validators.js & sequelize

                }

            },

            zip: {
                type: DataTypes.INTEGER,
                allowNull: true,
                validate: {
                    len: [5, 5], //nh: using the combination of integer and length of 5 until a better validator is implemented
                }
            },
            animal: {
                type: DataTypes.STRING,
                allowNull: true,
                is: ["^[a-z]+$", 'i'], //only allows letters (secondary validation incase user can by-pass the options given)

            },
            age: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            }

        },//ADD "," when using classMethods below
        {
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Favorites, {
                        onDelete: "cascade" //not sure this should be allowed as may delete pets from other users?
                    });
                }
            }
        }

    );

    return User;
};
>>>>>>> b7267bc7ce52830bc6e1a43bf217b53c5795eccd
