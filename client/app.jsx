import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            helloWorld: 'Hello'
        }
    }

    render(){
        return (
            <div> Hello </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('chat-app'));

