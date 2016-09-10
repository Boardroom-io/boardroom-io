import React from 'react';



function MessageForm (props){
  function textInput(){
    props.submit(document.getElementById("textSubmit").value);
  }
  return (
     <div>
        <input id="textSubmit" type="text" placeholder="Message" /> 
        <button type="submit" onClick={textInput}> Submit</button>
     </div>
    )
}

module.exports = MessageForm

