const db = require("../Utils/database");

// get data from db
exports.getData = function () {
    return db.execute("SELECT * FROM nodejsproject.products");
};

// insert data into db
exports.postData = function (itemName, itemDescription, itemPrice) {
    return db.execute(
        "INSERT INTO nodejsproject.products (title, description, price) VALUES (?, ?, ?)",
        [itemName, itemDescription, +itemPrice]
    );
};

// delete data from db
exports.deleteData = function (id) {
    return db.execute("DELETE FROM nodejsproject.products WHERE id=?", [id]);
};

// get by id
exports.getById = function (id) {
    return db.execute("SELECT * FROM nodejsproject.products WHERE id=?", [id]);
};

exports.postUpdateData = function (itemId, itemName, itemDescription, itemPrice) {
    console.log(itemId, itemName, itemDescription, itemPrice)
    return db.execute(
        "UPDATE nodejsproject.products SET title = ?, price = ?, description = ? where id = ?",
        [itemName, itemPrice, itemDescription, itemId]
    );
};
