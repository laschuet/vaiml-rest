import bodyParser from 'body-parser';
import express from 'express';
import sqlite from 'sqlite';

const app = express();
const host = 'localhost';
const port = process.env.PORT || 4010;

app.use(bodyParser.json());

app.get('/:db/contributions', async (req, res) => {
  const dbname = req.params.db;
  const sql = 'SELECT * FROM contribution ORDER BY id';

  let data = [];
  try {
    const db = await sqlite.open(`db/${dbname}`, sqlite.OPEN_READONLY);
    data = await db.all(sql);
    await db.close();
  } catch (err) {
    /* eslint-disable no-console */
    console.log(err);
    /* eslint-enable */
    res.sendStatus(500);
    return;
  }

  res.header('Access-Control-Allow-Origin', '*');
  res.send(data);
});

app.listen(port, host, err => {
  if (err) {
    /* eslint-disable no-console */
    console.err(err);
    /* eslint-enable */
    return;
  }
  /* eslint-disable no-console */
  console.log(`server is listening at http://${host}:${port}`);
  /* eslint-enable */
});
