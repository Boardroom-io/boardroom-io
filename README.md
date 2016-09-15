# Boardroom-io
## Remote collaborative whiteboarding

###Rationale

There are currently a number of excellent tools that enable
developers to colaborate remotely on code. However,
whiteboarding is an important element of the design process,
and at the present, there is a lack of solutions that allow
developers to collaborate remotely on handwritten diagrams.

### Getting started
1. Run `npm install` to install dependencies
2. Run `npm run front-end-build` to transpile and bundle the
client-side code. Gulp will watch for changes in the client-side
Javascript and automatically rebundle when it detects a change.
3. Run `npm start` to start the server. Nodemon will automatically
restart the server if it detects a change in the server side code.

### Connecting to the Boardroom
Boardroom-io incorporates WebRTC technology in order to allow clients
to exchange video, audio, text, and canvas data. However, WebRTCs video
and audio APIs are currently disallowed when the clients are connected
to an insecure server, due to security concerns. Therefore, in order
to test Boardroom-io from a local http server, it is necessary to
deactivate some of the security features of Google Chrome (see
  [here](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins) for more details).
To deactivate the security features on Google Chrome on Mac OSX, do the following:

1. Record the private IP address (on the local network) of the
computer that is running the server.
2. From a different computer connected to the same network, run
Google Chrome from the command line, including the
`--unsafely-treat-insecure-origin-as-secure=<IP Address of server computer, including port number>`.
  * On Mac OSX, type the following command in the command line:
    `/applications/google\ Chrome.app/Contents/MacOS/Google\ Chrome --unsafely-treat-insecure-origin-as-secure=<IP Address of server computer, including port number> --use-data-dir=<path to some directory where Chrome can put browsing data>`
  * Once the browser opens, navigate to the IP address of the computer
    running the server in the URL bar. Make sure to include the port number as well.
    For example: `192.168.0.117:3000`

### Resources
Currently, this project uses two different libraries to implement
WebRTC connections between clients:
1. [SimpleWebRTC](https://github.com/andyet/SimpleWebRTC) for the video and audio data
2. [Socket.io-p2p](http://socket.io/blog/socket-io-p2p/) for the canvas and text chat data