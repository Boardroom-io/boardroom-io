import React from 'react';
import ReactDOM from 'react-dom';
import MessageForm from './components/message_form.jsx'
import Message from './components/message.jsx'
import MessageContainer from './components/message_container.jsx'
import socket from './socket.js'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      messages:[]
    }
		socket.on('new message text', (newMessage) =>{
			this.handleNewMessage(newMessage);
		})
  }
	handleMessageSubmit(message)   {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
		console.log("handleMessageSubmit", message);
		socket.emit('send:message', message);
	}

	handleNewMessage(newMessage) {
		var {messages} = this.state;
		messages.push(newMessage);
		this.setState({messages});
	}

  render(){
    return (
      <div> 
        <MessageForm submit={this.handleMessageSubmit.bind(this)}/> 
				<MessageContainer messages={this.state.messages} /> 
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('chat-app'));

