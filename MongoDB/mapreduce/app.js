var express = require('express');
const { MongoClient } = require('mongodb')
var app = express();

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName = 'maps'

async function main() {
    // Use connect method to connect to the server
    await client.connect()
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('datas')

    const insertResult = await collection.insertMany([
        {
            cust_id: "A123",
            Amount: 200,
            status: "A"
        },
        {
            cust_id: "A123",
            Amount: 500,
            status: "A"
        },
        {
            cust_id: "B222",
            Amount: 400,
            status: "A"
        },
        {
            cust_id: "A123",
            Amount: 200,
            status: "A"
        }

    ])
    console.log('Inserted documents =>', insertResult);
    const findResult = await collection.find({}).toArray()
    console.log('Found documents =>', findResult);

    const reduce = await collection.mapReduce(function () { emit(this.cust_id, this.Amount); },
        function (key, values) {
            return Array.sum(values)
        }, {
        query: { status: "A" }, out: "orders"
    })
    console.log(reduce);
    // db.out.find({})

    return 'done.'
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close())


app.listen(8004, (req, res) => {
    console.log("serving at 8004");
})