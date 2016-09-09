$(document).ready(() => {

  const socket = require('./socket');

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
    let color = 'black';
    let width = '5';
    let erase = false;
    let drawOption;

    function startDraw(e) {
      mouseDown = true;
      prevX = e.pageX - rect.left;
      prevY = e.pageY - rect.top;
      drawOption = $('input[name=drawOption]:checked').val();
      if (drawOption === 'Write') {
        erase = false;
      } else if (drawOption === 'Erase') {
        erase = true;
      }
    }

    function newDraw(e) {
      if (mouseDown) {
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;
        color = $('#color').val();
        width = $('#width').val();
        if (erase) {
          eraser(x, y, width);
          socket.emit('erase', { x, y });
        } else {
          drawOnCanvas(prevX, prevY, x, y, width, color);
          socket.emit('draw', { prevX, prevY, x, y, width, color });
        }
        prevX = x;
        prevY = y;
      }
    }

    function drawOnCanvas(prevX, prevY, x, y, w, c) {
      context.strokeStyle = c;
      context.lineWidth = w;
      context.beginPath();
      context.moveTo(prevX, prevY);
      context.lineTo(x, y);
      context.stroke();
    }

    function eraser(x, y) {
      context.clearRect(x, y, 20, 20);
    }
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    $('#clear-canvas').on('click', () => {
      clearCanvas();
      socket.emit('clear');
    });

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
      drawOnCanvas(coords.prevX, coords.prevY, coords.x, coords.y, coords.width, coords.color);
    });
    socket.on('other client erase', coords => {
      eraser(coords.x, coords.y);
    });
    socket.on('clear all canvas', () => {
      clearCanvas();
    });
  }

  addEventListenersToCanvas();
});
