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
  .post('/api/update-score', (req, res) => {
    const score = req.body;
    db.saveScore(score, () => {
      res.end();
    });
  })
  .get('/api/match-results/:playerId', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.getMatchResults(req.params.playerId, results => res.end(JSON.stringify(results)))
  })
  .get('/api/leader-board', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.getLeaderBoard(results => res.end(JSON.stringify(results)));
  })
  // .patch('/api/join-match/', (req, res) => {
  //   const playerId = req.header('player-id');

  //   db.joinMatch(playerId, (match) => {


  //     if (match.player_2 === playerId) {
  //       Object.entries(connections).forEach(entry => {
  //         const key = entry[0];
  //         const value = entry[1];

  //         if (key === match.player_1) {
  //           value.send(JSON.stringify({
  //             eventType: 'opponent-found',
  //             opponentId: playerId
  //           }));
  //         }
  //       });
  //     }
  //     res.end(match);
  //   });
  // })
  .get('/api/open-match', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    db.getOpenMatch(results => res.end(results));
  })

  .post('/api/player', (req, res) => {
    const player = req.body;
    res.setHeader('Content-Type', 'application/json');
    db.savePlayer(player, match => {
      if (match.player_2 === player.id) {
        db.getPlayer(match.player_1, player1=> {
          Object.entries(connections).forEach(entry => {
            const key = entry[0];
            const value = entry[1];
  
            if (key === match.player_1) {
              try {
                value.send(JSON.stringify({
                  eventType: 'opponent-found',
                  opponentId: player.id,
                  opponentName: player.name,
                }));
              } catch (e) {}
            }
          });
          match.opponent = player1.name;
          res.end(JSON.stringify(match));
        });

      } else {
        res.end(JSON.stringify(match));
      }
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