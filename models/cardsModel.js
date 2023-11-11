module.exports = (sequelize, DataTypes) => {
    const cards = sequelize.define("cards", {
        title : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username : {
            type: DataTypes.STRING,
            allowNull: false,            
        }
    });
    
    return cards
}