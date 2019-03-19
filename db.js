const Pool = require('pg').Pool
const uuid = require('./uuid')
const pool = new Pool({
    user: 'dqcpqyfmbwvsjb',
    host: 'ec2-107-20-183-142.compute-1.amazonaws.com',
    database: 'ds7cisu21aeil',
    password: '46f69c31bacaa758a39f212f85f8fbf05ade706d7e5abb50e108225424194641',
    port: 5432,
    ssl: true,
})

module.exports.execute = function (query, parameters, callback) {

    pool.query(query, parameters, (error, results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })
}

module.exports.getOpenMatch = function (callback) {
    this.execute('SELECT * FROM match WHERE (player_1 IS NULL OR player_2 IS NULL) AND match_complete_date IS NULL', null, results => {

        if (results.length === 0) {
            const sql = 'INSERT INTO match (id) VALUES ($1)'
            const id = uuid.generateUUID()
            this.execute(sql, [id], results => {
                callback(JSON.stringify({
                    id: id
                }));
            })
        } else {

            callback(JSON.stringify(results[0]));
        }
    });
}

module.exports.endMatch = function (matchId, callback) {
    this.execute('UPDATE match SET match_complete_date = NOW() WHERE id = $1', [matchId], callback);
}

module.exports.savePlayer = function (player, callback) {

    this.execute('SELECT * FROM player WHERE id = $1', [player.id], results => {
        if (results.length > 0) {
            this.execute('UPDATE player SET name = $2 WHERE id = $1', [player.id, player.name], () => {
                this.joinMatch(player.id, match => callback(match));
            });
        } else {
            this.execute('INSERT INTO player (id, name) VALUES ($1, $2)', [player.id, player.name], () => {
                this.joinMatch(player.id, match => callback(match));
            });
        }
    });

}

module.exports.joinMatch = function (playerId, callback) {

    this.getOpenMatch(match => {
        const returnValue = JSON.parse(match);
        let sql = '';
        if (returnValue.player_1) {
            returnValue.player_2 = playerId;
            sql = 'UPDATE match SET player_2 = $1 WHERE id = $2';
        } else {
            returnValue.player_1 = playerId;
            sql = 'UPDATE match SET player_1 = $1 WHERE id = $2';
        }

        this.execute(sql, [playerId, returnValue.id], () => {
            callback(returnValue);
        });
    });
}