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
                unique:{
                    msg: "Username already exists"}
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique:true,
                validate: {
                    isEmail: true, //checks for email format (foo@bar.com) via validators.js & sequelize
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

        },
        // {
        //     validate: {
        //         retrunErr : function(){
        //             // if(!isEmail(this.email)){
        //             // throw new Error("Email must be in foo@bar.com format")
        //             //  }
        //             if(!unique(this.email)){
        //              throw new Error("User with this email is already signed up")
        //             }
        //         }
        //     }     
        // }, 
        {
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Favorites, {
                        onDelete: "cascade" 
                    });
                }
            }
        }

    );

    return User;
};


// var Pub = Sequelize.define('pub', {
//   name: { type: Sequelize.STRING },
//   address: { type: Sequelize.STRING },
//   latitude: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     defaultValue: null,
//     validate: { min: -90, max: 90 }
//   },
//   longitude: {
//     type: Sequelize.INTEGER,
//     allowNull: true,
//     defaultValue: null,
//     validate: { min: -180, max: 180 }
//   },
// }, {
//   validate: {
//     bothCoordsOrNone: function() {
//       if ((this.latitude === null) !== (this.longitude === null)) {
//         throw new Error('Require either both latitude and longitude or neither')
//       }
//     }
//   }
// })

// {validate: {
//     retrunErr : function(value){
//         if(!isEmail(value)){
//             throw new Error("Must input a proper email")
//         }
//         if(!unique(value)){
//             throw new Error("User with this email is already signed up")
//         }
//     }
//   }
// }

//         