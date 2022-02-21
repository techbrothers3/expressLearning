const express = require('express');
const cors = require('cors');
const { messageRouter } = require('./router/message');
const { port } = require('./config/configs');

const app = express();

const { urlLogger } = require('./common/logger-middleware');
const logger = require('./logger/file');

app.use(cors());
app.use(express.json());
app.use('/', urlLogger);
app.use('/message', messageRouter);
app.listen(port, () => {
  logger.info(`http://localhost:${port}`);
});
