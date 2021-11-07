// "use strict";





const Users = (sequelize, DataTypes) => sequelize.define('userData', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Users;

  