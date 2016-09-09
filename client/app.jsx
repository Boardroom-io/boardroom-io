import React from 'react';
import ReactDOM from 'react-dom';
import MessageForm from './components/message_form.jsx'
import Message from './components/message.jsx'
import MessageContainer from './components/message_container.jsx'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      messages:[]
    }
  }
	handleMessageSubmit(message)   {
		var {messages} = this.state;
		messages.push(message);
		this.setState({messages});
		socket.emit('send:message', message);
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

