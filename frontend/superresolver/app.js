const fs = require('fs')
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    fs.watch('./dash', (eventType, filename) => {
        console.log({eventType, filename})
        if (filename === "output.mpd") {
            console.log(eventType);
            // could be either 'rename' or 'change'. new file event and delete
            // also generally emit 'rename'
            console.log(filename);
            ws.send('output.mpd was created');
        }
      })
  });
});