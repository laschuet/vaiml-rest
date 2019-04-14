import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const host = 'localhost';
const port = process.env.PORT || 4010;

app.use(bodyParser.json());

app.get('/contributions', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send([
    {
      id: 1,
      author: 'Me',
      text: 'Just a string',
      timestamp: '2019-01-29 10:05:15',
    },
    {
      id: 2,
      author: 'You',
      text: 'Two words',
      timestamp: '2019-01-30 23:30:05',
    },
  ]);
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
