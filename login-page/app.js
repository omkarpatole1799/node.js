const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const loginRoute = require('./Routes/loginRoute')

// setting up view engine to ejs (hence ejs file can be render as html)
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));

app.use(loginRoute);

app.listen(3000, function(e){
    if(!e){
        console.log("Server started on port 3000");
    } else{
        console.log("Something wrong with server!");
        
    }
})