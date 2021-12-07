const express = require('express');
const { messageRouter } = require('./message');

const app = express();
const port = 3001;
console.log('hello');

const { urlLogger } = require('./common/logger-middleware');

app.use(express.json());
app.use('/', urlLogger);
app.use('/message', messageRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
