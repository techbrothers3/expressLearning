const { format, transports, createLogger } = require('winston');

const {
  timestamp, combine, colorize,
} = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const myFormat = format.printf(({
  level, message, timestamp,
}) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH-mm-ss' }),
    myFormat,
  ),
  //   defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'Application.log', level: 'silly' }),
  ],
});
logger.configure({
  level: 'silly',
  transports: [
    new DailyRotateFile({ filename: 'oldlogs' }),
  ],
});
module.exports = logger;
