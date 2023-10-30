module.exports = (sequelize, DataTypes) => {
    const soupdb = sequelize.define("cards", {
        title : {
            type: DataTypes.STRING,
        },
        description : {
            type: DataTypes.STRING,
        },
    });

    return soupdb
}