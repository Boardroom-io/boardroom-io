const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const p2p = require('socket.io-p2p-server').Server;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const userController = require('./controllers/userController');
const mongoURI = 'mongodb://dana:CS2016@ds029456.mlab.com:29456/boardroomdb';
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB');
});

app.use(bodyParser.urlencoded({extended: true}));

// This server will be used as a signaling server to establish peer to
// peer connections between clients. This happens automatically,
// behind the scenes.
io.use(p2p);

app.use((req, res, next) => {
  if (req.method !== 'GET') {
    return res.sendStatus(405);
  }
  next();
});

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});




http.listen(3000, () => console.log('listening on *:3000'));
