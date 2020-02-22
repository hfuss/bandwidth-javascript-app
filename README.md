# bandwidth-javascript-app
Sample Javascript app using Bandwidth Messaging APIs to send a text and receive a text using the Node SDK and bundling with Webpack.

The simple app has both a vanilla JS frontend, and a NodeJS backend. It demonstrates the following features:

* Frontend
  * text field for providing a phone number to send a text to
  * button for sending an API call to the backend to send a text
* Backend
  * `GET /sendText?to=<phone number>` endpoint for sending texts using the Bandwidth Node SDK
  * `POST /receiveText` endpoint secured with basic auth for recieving JSON callbacks from bandwidth api v1 whenever texts are sent to your number

Getting started:
```bash
npm install
```

Build the frontend bundle
```bash
npm run build
```

Build and run the server:
```
npm run dev
```

In a separate terminal, expose with `ngrok` in order to receive callbacks:
```bash
ngrok http 8080
```

Lastly, register your callback url i.e. `POST http://my-server-user:secret-password@1f7a61a3.ngrok.io/receiveText` with your application in the Bandwidth
Dashboard.

You can customize the server's settings with the following environment variables:
```bash
PORT=8081 \
USERNAME=other-server-user \
PASSWORD=secretest-password \
BW_USER_ID=u-something-else \
BW_API_TOKEN_ID=t-something-else \
BW_FROM_NUMBER=+19199999999 \
npm run dev
```
