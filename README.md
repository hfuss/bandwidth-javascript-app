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

Register your callback url ie http://1f7a61a3.ngrok.io/receiveText
and server's credentials with your application in the Bandwidth
Dashboard.
