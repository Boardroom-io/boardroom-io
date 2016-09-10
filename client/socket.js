import io from 'socket.io-client';

// Establish the socket connection to the server that served the page, and
// export it to make it available to other JS files on the client side.
const socket = io();

module.exports = socket;
