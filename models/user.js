module.exports = function(sequelize,DataTypes){
    var User = sequelize.define("user", {
        //sequelize automatically adds ID as primary key and auto increments
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        userName: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
        //This can be generated using javascript/jQuery from a combination of user inputs and sign-up
        AcctName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        },
        //we could minimize the address (remove white space) before pushing to database to save on # of columns in table.  For now will separate only zip code as that could be used as a seach criteria on its own.
        address: {
            type: DataTypes.STRING
        },
        zip: {
            type: DataTypes.INTEGER
        },
        Tpref: {
            type: DataTypes.STRING
        },
        Apref: {
            type: DataTypes.STRING
        },
        //Will convert this to a range (Integer) later but sticking to A, Y, X for now.
        Spref: {
            type: DataTypes.STRING
        }
        Gpref: {
            type: DataTypes.STRING
        }


    },{
        //don't think we want/need to record timestamps for anything.
        timestamps: false
    });
    return User;
};