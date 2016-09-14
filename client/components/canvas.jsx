import React from 'react';
import { Layer, Rect, Stage, Group, Image, Canvas } from 'react-konva';

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
  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
    // draw children “components”
    rect({ ctx, x: 10, y: 10, width: 50, height: 50 });
    rect({ ctx, x: 110, y: 110, width: 50, height: 50 });
  }
  render() {
    return (
      <Group>
        <Rect
          ref="rect"
          width="500"
          height="500"
          fill="green"
          draggable="true"
          />
      </Group>
    );
  }
}

module.exports = CanvasComponent;
