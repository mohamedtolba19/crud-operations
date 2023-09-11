const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:"sql12.freesqldatabase.com",
    database:"sql12645305",
    user:"sql12645305",
    password:"uDFZaY9bYG"
})

module.exports = connection