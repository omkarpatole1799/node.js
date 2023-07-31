const db = require("../Utils/database");

// get data from db
exports.getData = function () {
    return db.execute("SELECT * FROM nodejsproject.products");
};

// insert data into db
exports.postData = function (itemName, itemDescription, itemPrice, itemPhoto) {
    return db.execute(
        "INSERT INTO nodejsproject.products (title, description, price, image) VALUES (?, ?, ?, ?)",
        [itemName, itemDescription, +itemPrice, itemPhoto]
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

exports.postUpdateData = function (
    itemId,
    itemName,
    itemDescription,
    itemPrice,
    itemPath
) {
    return db.execute(
        "UPDATE nodejsproject.products SET title = ?, price = ?, description = ?, image = ? where id = ?",
        [
            itemName,
            itemPrice,
            itemDescription,
            itemPath,
            itemId,
        ]
    );
};
