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
  // componentDidMount() {
  //   var context = this.state.canvas.getContext('2d');
  //   context.strokeStyle = "#df4b26";
  //   context.lineJoin = "round";
  //   context.lineWidth = 5;
  //   var isPaint = false;
  //   var lastPointerPosition;
  //   var mode = 'brush';
  //   stage.on('contentMousedown.proto', function() {
  //     isPaint = true;
  //     lastPointerPosition = stage.getPointerPosition();
  //   });

  //   stage.on('contentMouseup.proto', function() {
  //       isPaint = false;
  //   });
  //   stage.on('contentMousemove.proto', function() {
  //     if (!isPaint) {
  //       return;
  //     }
  //     context.beginPath();
  //     var localPos = {
  //       x: lastPointerPosition.x - image.x(),
  //       y: lastPointerPosition.y - image.y(),
  //     };
  //     context.moveTo(localPos.x, localPos.y);
  //     var pos = stage.getPointerPosition();
  //     localPos = {
  //       x: pos.x - image.x(),
  //       y: pos.y - image.y(),
  //     };
  //     context.lineTo(localPos.x, localPos.y);
  //     context.closePath();
  //     context.stroke();
  //     lastPointerPosition = pos;
  //     layer.draw();
  //   });
  // }
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
