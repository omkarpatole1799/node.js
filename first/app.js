const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require('./utils/database');

const app = express();

const adminRoutes = require("./Routes/admin");
const shopRoutes = require("./Routes/shop");
const errorController = require("./controllers/error");

// using ejs templating engine
app.set("view engine", "ejs");

// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

// serve custom js and css files
app.use(express.static(path.join(__dirname, "public")));

db.execute('SELECT * FROM nodejsproject.`items list`',).then(
  console.log("hi")
  
).catch();

app.use(adminRoutes);

app.use(shopRoutes);

app.use(errorController.get404Page);
                            
app.listen(3000, function (e) {
  if (e) {
    console.log("there is error on server could not start");
  } else {
    console.log("Server spinned up on port 3000");
  }
});
