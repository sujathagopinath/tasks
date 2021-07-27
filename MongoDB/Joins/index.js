var express = require('express');
var mongo = require('mongodb').MongoClient;
var app = express();

mongo.connect("mongodb://localhost:27017/", (err, conn) => {
    if (err) {
        return console.error(err);
    }
    var db = conn.db("payroll");
    db.collection("department").aggregate([{
        $lookup:
        {
            from: 'employee',
            localField: 'manager',
            foreignField: 'manager',
            as: 'output'
        }
    }
    ]).toArray(function (err, rs) {
        if (err)
            return console.error(err);
        console.log(JSON.stringify(rs));
        conn.close();

    })
})


app.listen(8000, (req, res) => {
    console.log("serving at 8000");
})