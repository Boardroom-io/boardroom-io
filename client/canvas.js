import socket from './socket';

$(document).ready(() => {

  // Create the canvas and set it's properties
  const canvas = document.getElementById('drawMe');
  let rect = canvas.getBoundingClientRect();
  let context = canvas.getContext('2d');
  context.strokeStyle = 'black';
  context.lineWidth = '5';
  context.lineJoin = 'round';
  context.lineCap = 'round';

  // State variables
  let x;
  let y;
  let prevX;
  let prevY;
  let mouseDown = false;
  let color = 'black';
  let width = '5';
  let erase = false;
  let drawOption;
  let temp;

  /* Event handler for mousedown events */
  function startDraw(e) {
    // Get the bounding rectangle again, in case the user resized the screen
    rect = canvas.getBoundingClientRect();
    console.log(temp);

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

  function startDrawTouch(e) {
    // Get the bounding rectangle again, in case the user resized the screen
    rect = canvas.getBoundingClientRect();
    temp = e;
    e.preventDefault();

    mouseDown = true;
    prevX = e.targetTouches[0].pageX - rect.left;
    prevY = e.targetTouches[0].pageY - rect.top;

    drawOption = $('input[name=drawOption]:checked').val();
    if (drawOption === 'Write') {
      erase = false;
    } else if (drawOption === 'Erase') {
      erase = true;
    }
  }

  /* Event handler for mousemove events */
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

  function newDrawTouch(e) {
    e.preventDefault();

    if (mouseDown) {
      x = e.targetTouches[0].pageX - rect.left;
      y = e.targetTouches[0].pageY - rect.top;

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

  /**
   * Draws a stroke on the canvas from coordinates (prevX, prevY) to
   * coordinates (x, y). Variable w sets the line width and c sets the
   * line color
   */
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
  }

  // Establish event listeners for canvas mouse events
  canvas.addEventListener('mousedown', startDraw, false);
  canvas.addEventListener('mousemove', newDraw, false);
  canvas.addEventListener('mouseup', endDraw, false);
  canvas.addEventListener('mouseleave', endDraw, false);

  // FIXME: Figure out how to make canvas work with touchscreens
  canvas.addEventListener('touchstart', startDrawTouch, false);
  canvas.addEventListener('touchmove', newDrawTouch, true);
  canvas.addEventListener('touchend', endDraw, false);
  canvas.addEventListener('touchleave', endDraw, false);

  // Establish event listeners for receiving canvas data from other clients
  // through the socket connection
  socket.on('other client draw', coords => {
    drawOnCanvas(coords.prevX, coords.prevY, coords.x, coords.y, coords.width, coords.color);
  });
  socket.on('other client erase', coords => {
    eraser(coords.x, coords.y);
  });
  socket.on('clear all canvas', () => {
    clearCanvas();
  });
});
