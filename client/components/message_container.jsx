import React from 'react';
import Message from './components/message.jsx'

function MessageContainer(props){
  return (
    <div className = "MessageContainer">
				{
					props.messages.map((message, i) => {
						return (
							<Message
								key={i}
								text={message.text} 
							/>
						);
					})
				} 
    </div>
  )

}

module.exports = MessageContainer