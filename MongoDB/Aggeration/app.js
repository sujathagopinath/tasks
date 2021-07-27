var express = require('express');
var mongo = require('mongodb').MongoClient;
var app = express();

mongo.connect("mongodb://localhost:27017/", (err, conn) => {
    if (err) {
        return console.error(err);
    }
    var db = conn.db("customers");
    db.collection("purchase_orders").aggregate(
        [
            { $match: {} },
            { $group: { _id: "$customer", total: { $sum: "$total" } } }
        ]
    ).toArray(function (err, rs) {
        if (err)
            return console.error(err);
        console.log(JSON.stringify(rs));
        conn.close();

    })
})


app.listen(8001, (req, res) => {
    console.log("serving at 8000");
})