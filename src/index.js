import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  const button = document.createElement('input');
  button.setAttribute("type", "button");
  button.setAttribute("value", "Send a Text!");
  button.onclick = sendText;

  document.body.appendChild(element);
  document.body.appendChild(button);
}

function sendText() {
  httpGet("http://localhost:8080/sendText");
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

component();
