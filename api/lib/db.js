const { Pool } = require('pg');

const pool = new Pool();

pool.on('error', function(err, client) {
  console.error('idle client error', err.message, err.stack)
});

module.exports = {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) return console.error('error fetching client from pool', err);
        try {
          client.query(text, params, (err, res) => {
            if (err) reject(err);
            else resolve(res.rows);
          });
        } finally {
          client.release();
        }
      });
    });
  }
};
