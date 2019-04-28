import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import path from 'path';
import sqlite from 'sqlite';

const app = express();
const host = 'localhost';
const port = process.env.PORT || 4010;

const readdir = async dir => {
  return await new Promise((resolve, reject) => {
    fs.readdir(dir, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

app.use(bodyParser.json());

app.get('/datasets', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  try {
    const filenames = await readdir(path.join(process.cwd(), 'datasets'));
    const data = filenames.map((filename, index) => ({
      id: index,
      name: filename,
    }));
    res.send(data);
  } catch (err) {
    /* eslint-disable no-console */
    console.log(err);
    /* eslint-enable */
    res.sendStatus(500);
  }
});

app.get('/datasets/:dataset/contributions', async (req, res) => {
  const datasetName = req.params.dataset;
  const sql = 'SELECT * FROM contribution ORDER BY id';

  let data = [];
  try {
    const db = await sqlite.open(
      `datasets/${datasetName}`,
      sqlite.OPEN_READONLY,
    );
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
