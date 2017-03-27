var bcrypt = require("bcrypt");
var validator = require('validator');

module.exports = function(sequelize, DataTypes) {
    var Favorites = sequelize.define("Favorites", {
            //sequelize automatically adds ID as primary key and auto increments
            animalID: {
                    type: DataTypes.STRING,//need to confirm id is stored as a string
                    allowNull: false
            },
            UserId: {
                    type: DataTypes.INTEGER,//need to confirm id is stored as a string
                    allowNull: false
            },
        },
        {
            classMethods: {
                associate: function(models) {
                    Favorites.belongsTo(models.User, {//changed this to Many:Many association as multiple users may favorite the same pet
                        foreignKey: {
                            allowNull: false
                        }
                    });
                }
            }
        }
    );

    return Favorites;
};