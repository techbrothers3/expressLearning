const router = require('express').Router();
const logger = require('../logger/file');

const urlLogger = ('/', (req, res, next) => {
  logger.info(req.url);
  next();
});

module.exports = {
  urlLogger,
  basicRouter: router,
};
