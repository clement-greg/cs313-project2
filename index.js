const WebSocket = require('ws')
const http = require('http')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./db')
const uuid = require('./uuid')
var bodyParser = require("body-parser")

const connections = {};

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/html/pac-man.html')))
  .patch('/join-match/', (req, res) => {
    const playerId = req.header('player-id');

    db.joinMatch(playerId, (match) => {

      if (match.player_2 === playerId) {
        Object.entries(connections).forEach(entry => {
          const key = entry[0];
          const value = entry[1];

          if (key === match.player_1) {
            value.send(JSON.stringify({
              eventType: 'opponent-found',
              opponentId: playerId
            }));
          }
        });
      }
      res.end(match);
    });
  })
  .get('/open-match', (req, res) => {
    db.getOpenMatch(results => res.end(results));
  })

  .post('/player', (req, res) => {
    const player = req.body;
    db.savePlayer(player, match => {
      if (match.player_2 === player.id) {
        Object.entries(connections).forEach(entry => {
          const key = entry[0];
          const value = entry[1];

          if (key === match.player_1) {
            try {
              value.send(JSON.stringify({
                eventType: 'opponent-found',
                opponentId: player.id,
              }));
            } catch (e) {}
          }
        });
      }
      res.end(JSON.stringify(match));
    });
  })

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server
});


wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    try {
      const messageObj = JSON.parse(message);
      if (messageObj.eventType === 'register') {
        ws.playerId = messageObj.playerId;
        ws.matchId = messageObj.matchId;
        connections[messageObj.playerId] = ws;
      } else if (messageObj.eventType === 'game-activity') {
        Object.entries(connections).forEach(entry => {
          const key = entry[0];
          const value = entry[1];

          if (value.matchId === messageObj.matchId && value.playerId !== messageObj.playerId) {
            value.send(message);
          }
        });
      } else if (messageObj.eventType === 'assigned-match') {
        ws.matchId = messageObj.matchId;
      }
    } catch (ex) {}
  });
  ws.on('close', req => {
    delete connections[req.id];
    if (ws.matchId) {
      db.endMatch(ws.matchId, () => {});
    }
  });
});


server.listen(PORT, () => console.log(`Listening on ${ PORT }`))