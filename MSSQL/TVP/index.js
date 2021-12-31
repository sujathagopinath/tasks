const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const sql = require('mssql')

var config = {
    "user": process.env.USER, 
    "password": process.env.PASSWORD,
    "server": process.env.SERVER,
    "database": process.env.DATABASE, 
    "driver": "tedious",
    "options": {
        "encrypt": true,
        "trustServerCertificate": true
    }
}

const poolPromise = new sql.ConnectionPool(config)  
.connect()  
.then(pool => {  
console.log('Connected to MSSQL')  
return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  

var tvp_Emp = new sql.Table();
// Columns must correspond with type we have created in database.
tvp_Emp.columns.add('Name', sql.VarChar(50));
tvp_Emp.columns.add('Email', sql.VarChar(50));

for (var i = 1; i <= 5; i++) {  
   tvp_Emp.rows.add('MiteshGadhiya_' + i, (10000 * i));  
} 

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/login', async (req, res) => {  
    try {  
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password
const pool = await poolPromise  
const result = await pool.request()  
.input("name", sql.VarChar(50),name)  
.input("email", sql.VarChar(50), email)  
.input("password", sql.VarChar(50),password)  
.execute("Insertloginuser").then(function (recordSet) { 
console.log("data",recordSet)
res.status(200).json({ status: "Success" })  
})  
} catch (err) {  
// res.status(400).json({ message: "invalid" })  
res.send(err.message)  
}  
})  

app.listen('4000',(req, res) => {
    console.log("server at 4000")
})