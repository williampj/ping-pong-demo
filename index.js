const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const app = express();
const bodyParser = require('body-parser');

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];

app.use(bodyParser.json());

wss.on('connection', function connection(ws) {
  clients.push({ ws });
  console.log(`client connected`);
});

app.post('/api', function (req, res) {
  const payload = {
    data: req.body.data,
  };
  clients.forEach((client) => {
    client.ws.send(JSON.stringify(payload));
  });
  console.log('Post call received');
  res.end();
});

server.listen(8181);
