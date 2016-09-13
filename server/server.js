const express = require('express');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const p2p = require('socket.io-p2p-server').Server;

const app = express();

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
