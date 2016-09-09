var mouseDown = false;

$(document).ready(() => {




  function addEventListenersToCanvas() {
    let x;
    let y;
    const canvas = document.getElementById('drawMe');
    let rect;
    const context = canvas.getContext('2d');

    canvas.addEventListener('mousedown', (e) => {
      rect = canvas.getBoundingClientRect();
      mouseDown = true;
      draw(e.pageX - rect.left, e.pageY - rect.top, false);
    });

    canvas.addEventListener('mousemove', (e) => {
      rect = canvas.getBoundingClientRect();
      if (mouseDown) {
        console.log('moving');
        draw(e.pageX - rect.left, e.pageY - rect.top, true);
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
        context.closePath();
        context.stroke();
      }
      x = curX;
      y = curY;
    }
  }

  addEventListenersToCanvas();

});









