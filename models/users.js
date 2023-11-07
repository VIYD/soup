module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    users.hasMany(sequelize.models.cards, { 
        foreignKey: 'userID',
        onDelete: 'cascade',
    });

    return users;
};