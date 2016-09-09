const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('button clicked', () => {
    socket.broadcast.emit('other client clicked');
  });
});

http.listen(3000, () => console.log('listening on *:3000'));
