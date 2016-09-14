import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Rect, Stage, Group, Image, Canvas } from 'react-konva';
import CanvasComponent from './canvas.jsx';

class MyRect extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      color: Konva.Util.getRandomColor(),
    });
  }
  render() {
    return (
      <Stage className="drawMe" width={600} height={600}>
        <Layer>
          <CanvasComponent />
        </Layer>  
      </Stage>
    );
  }
}

module.exports = MyRect;

