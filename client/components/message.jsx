import React from 'react';

function Message(props) {
  return (
    <div className="Message">
      <div>{props.text}</div>
    </div>
  );
}

module.exports = Message;
