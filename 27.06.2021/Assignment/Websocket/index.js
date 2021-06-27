const express = require('express');
const socket = require('socket.io');

const app = express();
var server = app.listen(3000, function () {
    console.log("Server is running at port 3000");

})

app.use(express.static('public'));

app.get('/chat', (req, res) => {
    res.sendFile('./public/websocket.html', { root: __dirname });
})

var io = socket(server);

io.on('connection', function (socket) {
    console.log('connecting...', socket.id);

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    })

})







