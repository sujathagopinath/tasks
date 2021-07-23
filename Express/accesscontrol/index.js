const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: 'GET'

})
)
app.get('/data', (req, res) => {
    res.json({ name: 'gayle', favouritefood: 'rice' })

})

app.listen(3001, (req, res) => {
    console.log("serving at 3001");
})