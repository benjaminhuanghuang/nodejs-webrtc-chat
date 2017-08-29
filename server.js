const PeerServer = require('peer').PeerServer;
const express = require('express');
const morgan = require('morgan');
const app = express();
const expressServer = require('http').createServer(app)
const io = require('socket.io').listen(expressServer);
//
const MessageTypes = require('./messageType.js');

expressServer.listen(process.env.PORT || 3010);

app.use(morgan('combined'));
app.use(express.static(__dirname + '/client'));

var peerServer = new PeerServer({ port: 8010, path: '/chat' });

peerServer.on('connection', function (id) {
  io.emit(MessageTypes.USER_CONNECTED, id);
  console.log('User connected with #', id);
});

peerServer.on('disconnect', function (id) {
  io.emit(MessageTypes.USER_DISCONNECTED, id);
  console.log('With #', id, 'user disconnected.');
});