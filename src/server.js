import express from 'express';

const app = express();
const host = 'localhost';
const port = process.env.PORT || 8075;

app.get('/test', (req, res) => {
  res.send({ data: 'a simple string' });
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
