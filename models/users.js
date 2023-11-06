const Cards = require("./cards");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        username : {
            type: DataTypes.STRING,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    // Users.hasMany(Cards, {
    //     foreignKey: 'userID',
    //     onDelete: 'cascade'
    // });

    // Cards.belongsTo(Users)

    return Users
}