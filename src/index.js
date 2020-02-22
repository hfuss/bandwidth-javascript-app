// this contains the frontend javascript code that runs in your browser
// it calls the backend nodejs server
import _ from 'lodash';

function render() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  const textbar = document.createElement('input');
  textbar.setAttribute("type", "text");
  textbar.setAttribute("placeholder", "+191955512142");
  // TODO validate its a real phone number in the proper format

  const button = document.createElement('input');
  button.setAttribute("id", "button")
  button.setAttribute("type", "button");
  button.setAttribute("value", "Send a Text!");
  button.onclick = sendText(textbar);

  document.body.appendChild(element);
  document.body.appendChild(textbar);
  document.body.appendChild(button);
}

function sendText(textbar) {
  return function () {
    httpGet("http://localhost:8080/sendText?to=" + encodeURIComponent(textbar.value));
  }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

render();
