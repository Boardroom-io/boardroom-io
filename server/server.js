const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const app = express();
const privateKey = fs.readFileSync('./sslcert/server.key', 'utf-8');
const certificate = fs.readFileSync('./sslcert/server.crt', 'utf-8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = require('https').createServer(credentials, app);
// const httpServer = require('http').Server(app);
// const io = require('socket.io')(httpServer);
// const p2p = require('socket.io-p2p-server').Server;



// This server will be used as a signaling server to establish peer to
// peer connections between clients. This happens automatically,
// behind the scenes.
// io.use(p2p);

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

// http.listen(3000, () => console.log('listening on *:3000'));
httpsServer.listen(3000, () => console.log('listening on *:3000'));
