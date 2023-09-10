const express = require("express");
const app = express();
app.use(express.json());



app.listen(3000);

// Product.belongsTo(User, {constraints: true, onDelete: "CASCADE"});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
