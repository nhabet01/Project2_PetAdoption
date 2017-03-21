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
        },
        // phone: {
        //     type: DataTypes.INTEGER
        // },
        //we could minimize the address (remove white space) before pushing to database to save on # of columns in table.  For now will separate only zip code as that could be used as a seach criteria on its own.
        // address: {
        //     type: DataTypes.STRING
        // },
        zip: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },
        animal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        }


    });

    return User;
};