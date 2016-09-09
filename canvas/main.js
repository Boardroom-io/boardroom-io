$(document).ready(() => {

  const socket = io();

  function addEventListenersToCanvas() {
    const canvas = document.getElementById('drawMe');
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = '5';
    context.lineJoin = 'round';
    context.lineCap = 'round';
    let x;
    let y;
    let prevX;
    let prevY;
    let mouseDown = false;
    let locations = [];

    function startDraw(e) {
      mouseDown = true;
      prevX = e.pageX - rect.left;
      prevY = e.pageY - rect.top;
    }

    function newDraw(e) {
      if (mouseDown) {
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;

        drawOnCanvas(prevX, prevY, x, y);
        socket.emit('draw', {prevX, prevY, x, y});
        prevX = x;
        prevY = y;

      }
    }

    function drawOnCanvas(prevX, prevY, x, y) {
      context.beginPath();
      context.moveTo(prevX, prevY);
      context.lineTo(x, y);
      context.stroke();
    }

    function endDraw(e) {
      mouseDown = false;
      x = null;
      y = null;
      locations = [];
    }

    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', newDraw, false);
    canvas.addEventListener('mouseup', endDraw, false);
    canvas.addEventListener('mouseleave', endDraw, false);

    // FIXME: Figure out how to make canvas work with touchscreens
    // canvas.addEventListener('touchstart', startDraw, true);
    // canvas.addEventListener('touchmove', newDraw, true);
    // canvas.addEventListener('touchend', endDraw, true);
    // canvas.addEventListener('touchleave', endDraw, true);

    socket.on('other client draw', coords => {
      drawOnCanvas(coords.prevX, coords.prevY, coords.x, coords.y);
    });
  }

  addEventListenersToCanvas();
});
