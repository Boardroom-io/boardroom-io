var mouseDown = false;

$(document).ready(() => {

  const socket = io();

  function addEventListenersToCanvas() {
    let x;
    let y;

    socket.on('other client draw', coords => {
      const {newX, newY, bool} = coords;
      draw(newX, newY, bool);
    });

    const canvas = document.getElementById('drawMe');
    let rect;
    const context = canvas.getContext('2d');

    canvas.addEventListener('mousedown', (e) => {
      rect = canvas.getBoundingClientRect();
      mouseDown = true;

      const newX = e.pageX - rect.left;
      const newY = e.pageY - rect.top;
      draw(newX, newY, false);
      socket.emit('draw', {newX, newY, bool: false});
    });

    canvas.addEventListener('mousemove', (e) => {
      rect = canvas.getBoundingClientRect();
      if (mouseDown) {
        console.log('moving');
        const newX = e.pageX - rect.left;
        const newY = e.pageY - rect.top;
        draw(newX, newY, true);
        socket.emit('draw', {newX, newY, bool: true});
      }
    });

    canvas.addEventListener('mouseup', () => {
      mouseDown = false;
    });

    canvas.addEventListener('mouseleave', () => {
      mouseDown = false;
    });

    function draw(curX, curY, bool) {
      if (bool) {
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = '12';
        context.moveTo(x, y);
        context.lineTo(curX, curY);
        context.stroke();
      }
      x = curX;
      y = curY;
    }
  }

  addEventListenersToCanvas();
});
