const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const mongoURI = 'mongodb://dana:CS2016@ds029456.mlab.com:29456/boardroomdb';
const privateKey = fs.readFileSync(path.join(__dirname, '/sslcert/file.pem'), 'utf-8');
const certificate = fs.readFileSync(path.join(__dirname, '/sslcert/file.crt'), 'utf-8');
const credentials = { key: privateKey, cert: certificate };
const server = https.createServer(credentials, app);
const io = require('socket.io')(server);
const p2p = require('socket.io-p2p-server').Server;

app.all((req, res, next) => {
  console.log('request recieved');
  next();
})





mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB');
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secretPassword'));


// This server will be used as a signaling server to establish peer to
// peer connections between clients. This happens automatically,
// behind the scenes.
io.use(p2p);
io.on('connection', (socket) => {
  console.log('socket connected');
  
})

app.use('/element', express.static('../client/element'));
app.use(express.static(path.join(__dirname, '../client')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// app.get('/chat')
app.post('/signup', userController.createUser, (req, res) => {
  console.log('inside signup body ');
  // res.redirect('/chat')
  res.write('sweet');
  res.end();
});
// app.post('/login', userController.verifyUser, cookieController.setCookie,  (req, res) => res.redirect('/chat'));

server.listen(3000, () => console.log('listening on *:3000'));
