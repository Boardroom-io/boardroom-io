
$(document).ready(() => {
  console.log('Document ready');
  const socket = io();
  initSocket(socket);
  initButton(socket);
});

function initSocket(socket) {
  console.log('Initializing socket to server');
  socket.on('other client clicked', () => {
    console.log('The button was clicked on another client');
  });
}

function initButton(socket) {
  console.log('initializing button');
  $('button').on('click', () => {
    console.log('Button clicked');
    socket.emit('button clicked');
  });
}
