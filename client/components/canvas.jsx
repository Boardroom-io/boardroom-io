import React from 'react';

function canvas(props) {
  return (
    <div>
      <canvas id="drawMe" style={{ border: '1px solid black' }} />
      <select id="color">
        <option id="black" value="black">Black</option>
        <option id="red" value="red">Red</option>
        <option id="blue" value="blue">Blue</option>
        <option id="green" value="green">Green</option>
      </select>
      <select id="width" className="canvas-options">
        <option id="small" value="1">Small</option>
        <option id="medium" value="10">Medium</option>
        <option id="large" value="15">Large</option>
      </select>
      <div className="radio" id="erase-div">
        <button id="erase" name="drawOption" value="Erase" >Erase</button>
      </div>
      <div className="radio">
        <button id="write" name="drawOption" value="Write" checked="checked">Write</button>
      </div>
      <div id="clear-div">
        <button id="clear-canvas" className="canvas-options">Clear the canvas!</button>
      </div>
    </div>
  );
}

module.exports = canvas;
