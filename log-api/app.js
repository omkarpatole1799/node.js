const express = require("express");

const app = express();

const adminRoutes = require("./Routes/adminRoutes")
const userRoutes = require("./Routes/userRoutes")

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


app.listen(3000);