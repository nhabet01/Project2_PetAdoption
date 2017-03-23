var bcrypt = require("bcrypt");
var validator = require('validator');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
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
                    msg: 'Pleace ENTER A GOOD EMAIL'
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
        }
        // {
        //     indexes: [
        //     // Create a unique index on email
        //     {
        //       unique: true,
        //       fields: ['email']
        //     }]
        // }
    );

    return User;
};