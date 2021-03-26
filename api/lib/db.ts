import { Client } from 'pg';
import { QueryResult } from 'pg';

console.log(process.env.NODE_ENV);

const client: Client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  }
});

client.on('error', (err: Error) => {
  throw err;
});

export const query = (text: string, params?: any[]): Promise<any[]> =>
  new Promise(
    (resolve, reject): void => {
      client.query(text, params, (error: Error, res: QueryResult) => {
        if (error) return reject(error);

        if (res.command === 'DELETE' && res.rowCount < 1) reject(new Error('no rows deleted'));
        if (res.command === 'INSERT' && res.rowCount < 1) reject(new Error('no rows inserted'));
        if (['INSERT', 'SELECT'].includes(res.command)) resolve(res.rows);
      });
    },
  );
