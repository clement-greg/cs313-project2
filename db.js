const Pool = require('pg').Pool
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