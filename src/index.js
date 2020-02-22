import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  const textbar = document.createElement('input');
  textbar.setAttribute("type", "text");
  textbar.setAttribute("placeholder", "+191955512142");

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
    httpGet("http://localhost:8080/sendText?to=" + textbar.value);
  }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

component();
