import io from 'socket.io-client';
import PeerToPeer from 'socket.io-p2p';

// Establish the socket connection to the server that served the page, and
// export it to make it available to other JS files on the client side.
const socket = io();

// Establish a peer to peer socket, which will be
// managed by the server.
const p2p = new PeerToPeer(socket);
p2p.on('ready', () => {
  p2p.usePeerConnection = true;
});

module.exports = { socket, p2p };
