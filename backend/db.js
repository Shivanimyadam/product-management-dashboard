require('dotenv').config();

const mysql = require('mysql2');

// Create Connection

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // mysql username
    password: process.env.DB_PASSWORD, // mysql password
    database: process.env.DB_NAME // we will create this DB
});
console.log("DB_NAME:", process.env.DB_NAME);

// Connect

db.connect((error)=>{
    if(error){
        console.error("❌ MySQL connection failed:", error.message);
        return;
    }
    console.log("✅ MySQL connected successfully");

});

module.exports = db;