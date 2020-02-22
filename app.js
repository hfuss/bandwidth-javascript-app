const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const basicAuth = require('basic-auth');

const SERVER_USERNAME = process.env.USERNAME || 'my-server-user';
const SERVER_PASSWORD = process.env.PASSWORD || 'secret-password';
const Bandwidth = require('node-bandwidth');
var client = new Bandwidth({
    userId    : process.env.BW_USER_ID || "u-something",
    apiToken  : process.env.BW_API_TOKEN_ID || "t-something",
    apiSecret : process.env.BW_API_TOKEN_SECRET || "secretive"
});
const BUILD_DIR = path.resolve(__dirname, 'dist');
// the __dirname is the current directory from where the script is running
app.use(express.static(BUILD_DIR));
// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(path.resolve(BUILD_DIR, 'index.html'));
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
  console.log("Sending text to ", req.query.to)
  var message = {
      from: process.env.BW_FROM_NUMBER || "+19195551212", // <-- This must be a Bandwidth number on your account
      to: req.query.to,
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

app.listen(port, function() {
  console.log("server is running on 8080!")
});
