const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "loclhost",
    user: "root",
    password: "1111", 
    database: "log-app-db"
})

module.exports = pool.promise();