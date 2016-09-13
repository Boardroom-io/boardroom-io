import React from 'react';
import ReactDOM from 'react-dom';
import MessageForm from './components/message_form.jsx';
import Message from './components/message.jsx';
import MessageContainer from './components/message_container.jsx';
import { socket, p2p } from './socket.js';

// Top level React component for the text-chat window
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
    p2p.on('message', (newMessage) => {
      this.handleNewMessage(newMessage);
    });
  }
  handleMessageSubmit(message) {
    const { messages } = this.state;
    messages.unshift(message);
    this.setState({ messages });
    console.log('handleMessageSubmit', message);
    p2p.emit('message', message);
  }

  handleNewMessage(newMessage) {
    const { messages } = this.state;
    messages.unshift(newMessage);
    this.setState({ messages });
  }

  render() {
    return (
      <div>
        <MessageForm submit={this.handleMessageSubmit.bind(this)} />
        <MessageContainer messages={this.state.messages} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('chat-app'));
