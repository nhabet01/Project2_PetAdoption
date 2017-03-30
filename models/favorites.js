//Sequelize Favorites model

var bcrypt = require("bcrypt");
var validator = require('validator');

module.exports = function(sequelize, DataTypes) {
    var Favorites = sequelize.define("Favorites", {

        animalID: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
    },
        {
            classMethods: {
                associate: function(models) {
                    Favorites.belongsTo(models.User, { 
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