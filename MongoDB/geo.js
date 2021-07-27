db.getCollection('places').insertOne({
    name: "califorina",
    location: {
        type: "point",
        coordinates: ["37.229564", "-120.047533"]
    }
})


db.getCollection('places').find({
    location: {
        $near:
        {
            $geometric: {
                type: "point",
                coordinates: ["37.229564", "-120.047533"]
            }
        }
    }
})

db.places.createIndex({ location: "2dsphere" })
