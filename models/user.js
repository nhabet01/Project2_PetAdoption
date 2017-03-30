//Sequelize User Model

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

            unique: {
                msg: "Username already exists"

            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email in the System!'
            },

            //checks for email format (foo@bar.com) via validators.js & sequelize
            validate: {
                isEmail: {
                    msg: 'The email has wrong format!'
                }

            }

        },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                len: [5, 5],
                //using the combination of integer and length of 5 regex validation in routes as well
            }
        },
        animal: {
            type: DataTypes.STRING,
            allowNull: true,
            is: ["^[a-z]+$", 'i'],
            //only allows letters (secondary validation in case user can by-pass the options given)
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Favorites, {
                    onDelete: "cascade"
                });
            }
        }
    });

    return User;
};