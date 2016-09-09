$(document).ready(() => {

  function addEventListenersToCanvas() {
    const canvas = document.getElementById('drawMe');
    const rect = canvas.getBoundingClientRect();
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = '5';
    context.lineJoin = 'round';
    let x;
    let y;
    let mouseDown = false;
    let locations = [];

    function startDraw(e) {
      e.preventDefault();
      mouseDown = true;
    }

    function newDraw(e) {
      e.preventDefault();
      if (mouseDown) {
        x = e.pageX - rect.left;
        y = e.pageY - rect.top;

        locations.push({ x, y });

        drawOnCanvas(locations);
      }
    }

    function drawOnCanvas(locationsArr) {
      context.beginPath();
      context.moveTo(locationsArr[0].x, locationsArr[0].y);
      for (let i = 1; i < locationsArr.length; i++) {
        context.lineTo(locationsArr[i].x, locationsArr[i].y);
      }
      context.stroke();
    }

    function endDraw(e) {
      e.preventDefault();
      mouseDown = false;
      x = null;
      y = null;
      locations = [];
    }

    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', newDraw, false);
    canvas.addEventListener('mouseup', endDraw, false);
    canvas.addEventListener('mouseleave', endDraw, false);
    canvas.addEventListener('touchstart', startDraw, false);
    canvas.addEventListener('touchmove', newDraw, false);
    canvas.addEventListener('touchend', endDraw, false);
    canvas.addEventListener('touchleave', endDraw, false);
  }

  addEventListenersToCanvas();
});
