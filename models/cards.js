const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    const Cards = sequelize.define("cards", {
        title : {
            type: DataTypes.STRING,
        },
        description : {
            type: DataTypes.STRING,
        },
    });

    //todo: зробити таблицю з коментарями та імплементувати систему коментарів
    //

    // Cards.associate = (models) => {
    //     Cards.hasMany(models.Comments, {
    //         foreignKey: 'commentID',
    //         onDelete: 'cascade',
    //     })
    // }
    
    return Cards
}