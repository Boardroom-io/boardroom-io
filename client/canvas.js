import {socket, p2p} from './socket';
// The p2p (peer-to-peer) connection automatically
// sends messages to all other clients connected to this
// one. So, if I say:
//
// p2p.emit('hello', data)
//
// then all of the other clients connected to this one will
// receive the 'hello' event, and they could respond to it
// by writing an event handler like:
//
// p2p.on('hello', data => {
//    do something with the data
// })

$(document).ready(() => {
  // Create the canvas and set it's properties
  const canvas = document.getElementById('drawMe');
  let rect = canvas.getBoundingClientRect();
  const context = canvas.getContext('2d');
  context.strokeStyle = 'black';
  context.lineWidth = '1';
  context.lineJoin = 'round';
  context.lineCap = 'round';
  // Create state variables
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

  /** Event handler for mousedown events on the canvas */
  function startDraw(e) {
    // Get the bounding rectangle again, in case the user resized the screen
    rect = canvas.getBoundingClientRect();

    mouseDown = true;
    prevX = ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
    prevY = ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
    drawOption = $('input[name=drawOption]:checked').val();
    if (drawOption === 'Write') {
      erase = false;
    } else if (drawOption === 'Erase') {
      erase = true;
    }
  }

  // /** Event handler for when a user touches the canvas on a touchscreen */
  // function startDrawTouch(e) {
  //   // Get the bounding rectangle again, in case the user resized the screen
  //   rect = canvas.getBoundingClientRect();
  //   e.preventDefault();

  //   mouseDown = true;
  //   prevX = e.targetTouches[0].pageX - rect.left;
  //   prevY = e.targetTouches[0].pageY - rect.top;

  //   drawOption = $('input[name=drawOption]:checked').val();
  //   if (drawOption === 'Write') {
  //     erase = false;
  //   } else if (drawOption === 'Erase') {
  //     erase = true;
  //   }
  // }

  /** Event handler for mousemove events */
  function newDraw(e) {
    if (mouseDown) {
      x = ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
      y = ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;
      console.log('x rect.left pagex', x, rect.left, e.pageX)
      console.log('y rect.top pagey',y,rect.top,e.pageY)
      color = $('#color').val();
      width = $('#width').val();
      if (erase) {
        eraser(x, y, width);
        p2p.emit('erase', { x, y });
      } else {
        drawOnCanvas(prevX, prevY, x, y, width, color);
        p2p.emit('draw', { prevX, prevY, x, y, width, color });
      }
      prevX = x;
      prevY = y;
    }
  }

  // /** Event handler for when the user moves their finger on a touchscreen */
  // function newDrawTouch(e) {
  //   e.preventDefault();

  //   if (mouseDown) {
  //     x = e.targetTouches[0].pageX - rect.left;
  //     y = e.targetTouches[0].pageY - rect.top;

  //     color = $('#color').val();
  //     width = $('#width').val();
  //     if (erase) {
  //       eraser(x, y, width);
  //       socket.emit('erase', { x, y });
  //     } else {
  //       drawOnCanvas(prevX, prevY, x, y, width, color);
  //       p2p.emit('draw', { prevX, prevY, x, y, width, color });
  //     }
  //     prevX = x;
  //     prevY = y;
  //   }
  // }

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

  /**
   * Erases a rectangle from the canvas. Called when the user moves their mouse
   * and the "erase" radio button is selected
   */
  function eraser(x, y) {
    context.clearRect(x, y, 20, 20);
  }

  /**
   * Clears all ink currenty showing on the canvas. Called when the
   * "clear canvas" button is clicked
   */
  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  $('#clear-canvas').on('click', () => {
    clearCanvas();
    p2p.emit('clear');
  });

  /**
   * Clears the state variables when the user releases the mouse button
   */
  function endDraw(e) {
    mouseDown = false;
    x = null;
    y = null;
  }

    /** Establish event listeners for canvas mouse events */
    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', newDraw, false);
    canvas.addEventListener('mouseup', endDraw, false);
    canvas.addEventListener('mouseleave', endDraw, false);

    // FIXME: Figure out how to make canvas work with touchscreens
    canvas.addEventListener('touchstart', startDrawTouch, false);
    canvas.addEventListener('touchmove', newDrawTouch, true);
    canvas.addEventListener('touchend', endDraw, false);
    canvas.addEventListener('touchleave', endDraw, false);
  /**
   * Establish event listeners for receiving canvas data from other clients
   * through the peer to peer connection
   */
  p2p.on('draw', coords => {
    drawOnCanvas(coords.prevX, coords.prevY, coords.x, coords.y, coords.width, coords.color);
  });
  p2p.on('erase', coords => {
    eraser(coords.x, coords.y);
  });
  p2p.on('clear', () => {
    clearCanvas();
  });

  $('#localVideo').hide();
  // $('#remoteVideos').change((e) => {
  //   alert('this is changing');
  //   let numberOfVideos = $('#remoteVideos video').length;

  //   let numRows = 1;
  //   let numCols = 2;
  //   let colWidth = '300px';
  //   let rowHeight = '300px';
  //   if (numberOfVideos > 1) {
  //     numRows = Math.ceil(Math.sqrt(numberOfVideos));
  //     numCols = numRows;
  //     colWidth = (600 / numRows).toString();
  //     colWidth += 'px';
  //     rowHeight = colWidth;
  //   }
  //   $('video').css('width', 'colWidth');
  //   $('video').height(rowHeight);
  // });

  $('#container').on('DOMNodeInserted', 'video', function (e) {
    const numberOfVideos = $('#remoteVideos video').length;
    let numRows = 1;
    let numCols = 2;
    let colWidth = '498px';
    let rowHeight = '498px';
    if (numberOfVideos > 1) {
      numRows = Math.ceil(Math.sqrt(numberOfVideos));
      numCols = numRows;
      colWidth = (498 / numRows).toString();
      colWidth += 'px';
      rowHeight = colWidth;
    }
    $('video').height(rowHeight);
    $('video').width(colWidth);
  });
  $('#vcontainer').on('DOMNodeRemoved', 'video', function (e) {
    const numberOfVideos = $('#remoteVideos video').length - 1;

    let numRows = 1;
    let numCols = 2;
    let colWidth = '498px';
    let rowHeight = '498px';
    if (numberOfVideos > 0) {
      numRows = Math.ceil(Math.sqrt(numberOfVideos));
      numCols = numRows;
      colWidth = (498 / numRows).toString();
      colWidth += 'px';
      rowHeight = colWidth;
    }
    $('video').height(rowHeight);
    $('video').width(colWidth);
  });

  $("#textSubmit").keyup(function (event) {
    if (event.keyCode == 13) {
      $("form").submit();
    }
  });
  $("#chatSubmit").on('submit', function (e) {
    e.preventDefault();
  });
});
