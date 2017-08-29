var PeerServer = require('peer').PeerServer;
var express = require('express');
var app = express();
var expressServer = require('http').createServer(app)
var io = require('socket.io').listen(expressServer);


users = [];
connections = [];
server.listen(process.env.PORT || 3010);


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log('Connected: %s socket connected', connections.length);

    // Disconnect
    socket.on('disconnect', function (data) {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();

        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s socket connected', connections.length);
    });

    // Send message
    socket.on('send message', function (data) {
        console.log(data);
        io.sockets.emit('new message', {
            msg: data,
            user:socket.username
        })
    });

    //new user
    socket.on('new user', function (data, callback) {
        console.log(data);
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames() {
        io.sockets.emit('get users', users);
    }
});