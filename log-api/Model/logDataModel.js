const Sequelize = require("sequelize");
const sequelize = require("../Utils/database");

const UserLogs = sequelize.define("UserLogs", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    logInfomation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = UserLogs;
