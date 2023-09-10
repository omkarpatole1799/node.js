const db = require("../utils/database");

// fetch data from database
exports.getData = function () {
  return db.execute("SELECT * FROM nodejsproject.products");
};

// get data from id
exports.getDataFromId = function (id) {
  return db.execute("SELECT * FROM nodejsproject.products WHERE id=?",[id]);
};

// insert data into database
exports.postData = function (name, price, description) {
  return db.execute(
    "INSERT INTO nodejsproject.products (title, price, description) values (?, ?, ?)",
    [name, price, description]
  );
};

// delete from database
exports.deleteData = function (id) {
  return db.execute("DELETE from nodejsproject.products WHERE id=?",[id]);
};
