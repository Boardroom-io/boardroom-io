import React from 'react';
import Message from './message.jsx'

function MessageContainer(props) {
  console.log(props.messages)
  return (
    <div className = "MessageContainer">
      {
        props.messages.map((message, i) => {
          return (
            <Message
              key={i}
              text={message}
              />
          );
        })
      }
    </div>
  )

}

module.exports = MessageContainer