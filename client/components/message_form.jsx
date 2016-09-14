import React from 'react';



function MessageForm(props) {
  function textInput() {
    props.submit(document.getElementById('textSubmit').value);
    document.getElementById('textSubmit').value = '';
  }
  return (
    <form id="chatSubmit">
      <input id="textSubmit" type="text" placeholder="Message" />
      <button id="textButton" type="submit" onClick={textInput}> Submit</button>
    </form>
  );
}

module.exports = MessageForm;


