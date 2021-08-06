db.getCollection('basic').insertMany([
    { studentId: "101", studentName: "chris" },

    { studentId: "102", studentName: "John" },

    { studentId: "103", studentName: "Ryan" },

    { studentId: "104", studnetName: "suja" }

])

// Find the particular field

db.getCollection('basic').find({}, { "_id": 0, "studentId": 0 });

//Find the particular row 
db.getCollection('basic').find({ "studentId": "101" })

db.getCollection('basic').updateOne({}, { $set: { studentId: "105" } })