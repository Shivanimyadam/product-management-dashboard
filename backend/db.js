const mysql = require('mysql2');

// Create Connection

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // mysql username
    password: "Root@123", // mysql password
    database: "product_management" // we will create this DB
});

// Connect

db.connect((error)=>{
    if(error){
        console.error("❌ MySQL connection failed:", error.message);
        return;
    }
    console.log("✅ MySQL connected successfully");

});

module.exports = db;