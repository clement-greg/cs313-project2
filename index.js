const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const db = require('./db')
const uuid = require('./uuid')
var bodyParser     =        require("body-parser")

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/html/pac-man.html')))
  .get('/open-match', (req, res) => {


    db.execute('SELECT * FROM match WHERE player_1 IS NULL OR player_2 IS NULL', null, results => {

      if (results.length === 0) {

        const sql = 'INSERT INTO match (id) VALUES ($1)'
        const id = uuid.generateUUID()
        db.execute(sql, [id], results => {
          res.end(JSON.stringify({
            id: id
          }))
        })
      } else {

        res.end(JSON.stringify(results[0]))
      }
    });
  })

  .post('/player',(req, res)=> {

    console.log(req.body)
    const player  = req.body
    db.execute('INSERT INTO player (id, name) VALUES ($1, $2)',[ player.id, player.name], ()=> {
      res.end();
    })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))