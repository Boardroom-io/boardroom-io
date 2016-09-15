import React from 'react';
import ReactDOM from 'react-dom';
import { Layer, Rect, Stage, Group, Image } from 'react-konva';
import CanvasComponent from './canvas.jsx';

class MyRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
      canvas: document.createElement('canvas'),
    };
    this.save = this.save.bind(this);
  }
  componentWillMount() {
    this.state.canvas.width = 600;
    this.state.canvas.height = 600;
  }
  componentDidUpdate() {
    const stage = this.refs.stage.getStage();
    stage.draw();
    const image = this.refs.image;
    const layer = this.refs.layer;
    const context = this.state.canvas.getContext('2d');
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    let isPaint = false;
    let lastPointerPosition;
    let mode = this.props.mode;
    stage.on('contentMousedown.proto', function() {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();
    });

    stage.on('contentMouseup.proto', function() {
      isPaint = false;
    });
    stage.on('contentMousemove.proto', function () {
      if (!isPaint) {
        return;
      }
      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }
      if (mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();
      let localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      let pos = stage.getPointerPosition();
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
  save() {
    const stage = this.refs.stage.getStage();
    let saved = stage.toJSON();
    let data = {"fileJSON": saved, "fileName": 'somename'}
    $.post('/element', data);
  }
  render() {
    return (
      <div>
        <Stage ref="stage" width={600} height={600}>
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
        <button onClick={this.props.updateMode}>Write/Erase</button>
        <button onClick={this.save}>Save board</button>
      </div>
    );
  }
}

module.exports = MyRect;

