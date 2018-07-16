const winston = require('winston');

const logger = winston.createLogger({
  level: 'info'
});
 
logger.add(new winston.transports.File({
  filename: 'errors.log',
  level: 'error'
}));

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;