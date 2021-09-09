const {Pool} = require('pg');

const pool = new Pool({
    user: 'owner',
    host: 'localhost',
    port: 5433,
    database: 'pubcov'
});

module.exports = pool;