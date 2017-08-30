const PeerServer = require('peer').PeerServer;
const express = require('express');
const morgan = require('morgan');
const app = express();
const expressServer = require('http').createServer(app)
const io = require('socket.io').listen(expressServer);
//
const MessageTypes = require('./messageType.js');

expressServer.listen(process.env.PORT || 8010);

app.use(morgan('combined'));
app.use(express.static(__dirname + '/client'));

//create a PeerJS server that runs on port 8020
//responsible for handling the signaling between the different peers
const peerServer = new PeerServer({ port: 8020, path: '/peerjs' });

/*
Once PeerServer detects that a peer has been connected to it, it triggers the event 
USER_CONNECTED to all peers. 
*/
peerServer.on('connection', function (id) {
  io.emit(MessageTypes.USER_CONNECTED, id);
  console.log('User connected with #', id);
});

/*
Once a client disconnects from the PeerServer we trigger USER_DISCONNECTED. 
These two events are very important for handling the list of currently available users
*/
peerServer.on('disconnect', function (id) {
  io.emit(MessageTypes.USER_DISCONNECTED, id);
  console.log('With #', id, 'user disconnected.');
});