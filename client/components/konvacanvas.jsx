import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Rect, Stage, Group } from 'react-konva';

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
      <Rect
        x={10} y={10} width={600} height={600}
        fill={this.state.color}
        shadowBlur={10}
        onClick={this.handleClick}
      />
    );
  }
}

module.exports = MyRect;

