var PeerServer = require('peer').PeerServer;
var express = require('express');
var app = express();
var expressServer = require('http').createServer(app)
var io = require('socket.io').listen(expressServer);
var MessageTypes = require('./messageType.js');

expressServer.listen(process.env.PORT || 3010);

app.use(express.static(__dirname + '/client'));

var peerServer = new PeerServer({ port: 9010, path: '/chat' });

peerServer.on('connection', function (id) {
  io.emit(MessageTypes.USER_CONNECTED, id);
  console.log('User connected with #', id);
});

peerServer.on('disconnect', function (id) {
  io.emit(MessageTypes.USER_DISCONNECTED, id);
  console.log('With #', id, 'user disconnected.');
});