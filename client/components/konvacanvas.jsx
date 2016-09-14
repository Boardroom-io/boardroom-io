import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Rect, Stage, Group, Image, Canvas } from 'react-konva';
import CanvasComponent from './canvas.jsx';

class MyRect extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      color: 'green',
      canvas: document.createElement('canvas'),
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      color: Util.getRandomColor(),
    });
  }
  componentWillMount() {
    this.state.canvas.width = 500;
    this.state.canvas.height = 500;
  }
  componentDidMount() {
    const stage = this.refs.stage.getStage();
    const image = this.refs.image;
    const layer = this.refs.layer;
    var context = this.state.canvas.getContext('2d');
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    var isPaint = false;
    var lastPointerPosition;
    var mode = 'brush';
    stage.on('contentMousedown.proto', function() {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();
    });

    stage.on('contentMouseup.proto', function() {
        isPaint = false;
    });
    stage.on('contentMousemove.proto', function() {
      if (!isPaint) {
        return;
      }
      context.beginPath();
      var localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y(),
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      lastPointerPosition = pos;
      layer.draw();
    });
  }
  render() {
    return (
      <Stage ref="stage" className="drawMe" width={600} height={600}>
        <Layer ref="layer">
          <Image
            ref="image"
            image={this.state.canvas}
            x={0}
            y={0}
            stroke="green"
            shadowBlur={5}
          />
        </Layer>
      </Stage>
    );
  }
}

module.exports = MyRect;

