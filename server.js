const PeerServer = require('peer').PeerServer;
const express = require('express');
const morgan = require('morgan');
const app = express();
const expressServer = require('http').createServer(app)

expressServer.listen(process.env.PORT || 8010);

app.use(morgan('combined'));
app.use(express.static(__dirname + '/client'));
