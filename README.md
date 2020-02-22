# bandwidth-javascript-app
Sample Vanilla Javascript app using Bandwidth Messaging APIs to send a text and receive a text using the Node SDK + Webpack/

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

Register your callback url i.e. `http://my-server-user:secret-password@1f7a61a3.ngrok.io/receiveText`
and server's credentials with your application in the Bandwidth
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
