import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const app: express.Application = express();

import router from './api/router';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/dist'));
app.use('/api', router);

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (const row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send(err);
});

const normalizePort = (val: string): string | number | boolean => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

export const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
