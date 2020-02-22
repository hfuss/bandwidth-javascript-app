const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

const Bandwidth = require('node-bandwidth');
var client = new Bandwidth({
    userId    : "YOUR_USER_ID",
    apiToken  : "YOUR_API_TOKEN",
    apiSecret : "YOUR_API_SECRET"
});

// the __dirname is the current directory from where the script is running
app.use(express.static(path.resolve(__dirname, 'dist')));
// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

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
