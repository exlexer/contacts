import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const app: express.Application = express();

import router from './api/router';

app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('client/dist'));
app.use('/api', router);

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
