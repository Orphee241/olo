const mysql = require("mysql")

const options ={
    host: "localhost",
    user: "root",
    password: "rootpassword",
    database: "olo"
}

const connection = mysql.createConnection(options); // or mysql.createPool(options);

connection.connect((err)=>{
    if(err){
        throw err
    }
    console.log("Database Connected")
})

module.exports = connection;