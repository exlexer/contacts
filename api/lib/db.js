const { Pool } = require('pg');

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
        rejectUnauthorized: false,
      }
      : false,
});

client.on('error', (err) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports = {
  query(text, params) {
    return new Promise((resolve, reject) => {
      client.connect();

      try {
        client.query(text, params, (error, res) => {
          if (error) return reject(error);

          if (res.command === 'DELETE' && res.rowCount < 1) reject(new Error('no rows deleted'));
          if (res.command === 'INSERT' && res.rowCount < 1) reject(new Error('no rows inserted'));
          if (res.command === 'INSERT' && res.rows.length === 1) resolve(res.rows[0]);
          if (res.command === 'INSERT' && res.rows.length > 1) resolve(res.rows);
          if (res.command === 'SELECT' && res.rowCount === 1) resolve(res.rows[0]);
          if (res.command === 'SELECT' && res.rowCount > 1) resolve(res.rows);
          return resolve(res);
        });
      } finally {
        client.end();
      }
    });
  },
};
