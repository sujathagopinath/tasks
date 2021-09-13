const express = require('express');
const app = express();
const routes = require('./routes/newRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/joi', routes)

app.get('/get', (req, res) => {
    res.send('API is running....');
});



app.listen(8000, () => {
    console.log("Server is running on port 8000");
})