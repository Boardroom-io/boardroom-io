import React from 'react';
import { Layer, Rect, stage, Group, Image, Line } from 'react-konva';

// class CanvasComponent extends React.Component {
//   componentDidMount() {
//     this.updateCanvas();
//   }
//   componentDidUpdate() {
//     this.updateCanvas();
//   }
//   updateCanvas() {
//     const ctx = this.refs.canvas.getContext('2d');
//     ctx.clearRect(0, 0, 300, 300);
//   }
//   render() {
//     return (
//       <canvas width={300} height={300} />
//     );
//   }
// }

function rect(props) {
  const { ctx, x, y, width, height } = props;
  ctx.fillRect(x, y, width, height);
}
class CanvasComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      points: [0, 300],
      canvas: document.createElement('canvas'),
    };
  }
  componentWillMount() {
    this.state.canvas.width = 500;
    this.state.canvas.height = 500;
  }
  updateCanvas() {
    // const ctx = this.refs.line.getContext('2d');
  }
  render() {
    return (
      <Image
        image={this.state.canvas}
        x={0}
        y={0}
        stroke="green"
        shadowBlur={5}
      />
    );
  }
}

module.exports = CanvasComponent;
