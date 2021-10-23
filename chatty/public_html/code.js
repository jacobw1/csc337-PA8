/* Author: Jacob Williams
 * Purpose: This file ineracts with the index.html file to send information to the server
 * useage: none
 */

// gets the chat messages from the DB and server
function getChat(){
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    return false;
  }
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        let board = document.getElementById('message_board');
        board.innerHTML = httpRequest.responseText;

      } else { alert('ERROR'); }
    }
  }
  let url = '/chats';
  httpRequest.open('GET',url);
  httpRequest.send();
}
// gets information from text fields and sends to server to be added into DB
// calls when button is pushed in html
function createMessage(){
  var httpRequest = new XMLHttpRequest();
  if(!httpRequest){
    return false;
  }
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log(httpRequest.responseText);
        getChat();
      } else { alert('ERROR'); }
    }
  }
  let alias = document.getElementById('alias').value;
  let message = document.getElementById('message').value;
  let url = '/chats/'+alias+'/'+message;
  httpRequest.open('POST',url);
  httpRequest.send();
}
// sets the interval to reload the messages every second
setInterval(function(){getChat()}, 1000 );
