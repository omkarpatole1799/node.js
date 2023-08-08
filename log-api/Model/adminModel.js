const db = require("../Utils/database");

const adminModel = {
    postUserData: async function (email, password, userType, profileImage) {
        return db.execute(
            "INSERT INTO logdb.users (user_name, password, type, profile_image) VALUES (?, ?, ?, ?)",
            [email, password, userType, profileImage]
        );
    },
    getByEmail: async function (email) {
        return db.execute("SELECT user_name FROM logdb.users WHERE user_name = ?", [email]);
    },
};
module.exports = adminModel;
