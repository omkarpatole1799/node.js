const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1111",
  database: "nodejsproject",
});

const db = pool.promise();
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});

app.get("/product-data", function (req, res) {
  db.execute("SELECT * FROM nodejsproject.products")
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => console.log(err));
});

app.post("/add-product", function (req, res) {
  db.execute(
    "INSERT INTO nodejsproject.products (title, description, price) VALUES (?, ?, ?)",
    [req.body.itemName, req.body.itemDescription, +req.body.itemPrice]
  )
    .then(() => {
      console.log("Success adding data");
    })
    .catch((err) => console.log(err));
});
app.post("/product-data/edit/:id", function (req, res) {
  let id = req.params.id;
  db.execute("SELECT * from nodejsproject.products WHERE id=?", [id])
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => console.log(err));
});
app.delete("/product-data/:id", function (req, res) {
  let id = req.params.id;
  db.execute("DELETE FROM nodejsproject.products WHERE id=?", [id])
    .then(() => {
      console.log("deleted successful", id);
    })
    .catch((err) => console.log(err));
});

app.listen(3000);
