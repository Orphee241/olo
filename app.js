const express = require('express');
const db = require("./database")
const mysql = require("mysql")
const pagesRoutes = require("./routes/pagesRoutes")


const app = express();

//Definition du moteur de rendu
app.set('view engine','ejs');
app.set('views','./html');

//Pour se servir des fichiers statiques(css/img/js etc...)
app.use("/assets",express.static("assets"));


//Routes
app.use(pagesRoutes);


app.listen(5501,()=>{
    console.log("https//localhost:5501")
})