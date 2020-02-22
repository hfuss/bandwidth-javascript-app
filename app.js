const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const basicAuth = require('basic-auth');

const SERVER_USERNAME = process.env.USERNAME || 'my-server-user';
const SERVER_PASSWORD = process.env.PASSWORD || 'secret-password';
const Bandwidth = require('node-bandwidth');
var client = new Bandwidth({
    userId    : "YOUR_USER_ID",
    apiToken  : "YOUR_API_TOKEN",
    apiSecret : "YOUR_API_SECRET"
});
const BUILD_DIR = path.resolve(__dirname, 'dist');
// the __dirname is the current directory from where the script is running
app.use(express.static(BUILD_DIR));
// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(path.resolve(BUILD_DIR, 'index.html'));
});

// JSON Body Parser
app.use(express.json());

// Basic Auth
const auth = function (req, res, next) {
  function unauthorized(res) {
    logger.warn('Unauthorized');
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === SERVER_USERNAME && user.pass === SERVER_PASSWORD) {
    return next();
  } else {
    return unauthorized(res);
  };
};

app.post('/receiveText', auth, (req, res, next) => {
  if (!req.is('application/json')) {
    res.sendStatus(415);
    return next();
  }

  const catapultData = req.body;
  console.log(catapultData);
  res.send("received!")
})

app.get('/sendText', (req,res) => {
  var message = {
      from: "+19195551212", // <-- This must be a Bandwidth number on your account
      to: "+191955512142",
      text: "Hello World"
  };

  res.send("sent!");
  client.Message.send(message)
  .then(function(message) {
      console.log("Message sent with ID " + message.id);
  })
  .catch(function(err) {
      console.log(err.message);
  });
})

app.listen(port);
