const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "nodejsproject",
});

module.exports = pool.promise();
