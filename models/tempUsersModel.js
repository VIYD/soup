module.exports = (sequelize, DataTypes) => {
    const tempUsers = sequelize.define("tempUsers", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return tempUsers;
};