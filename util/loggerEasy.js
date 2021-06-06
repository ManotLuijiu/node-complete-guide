const winston = require('winston');

const colorizer = winston.format.colorize();

// const dev = process.env.NODE_ENV !== 'production';

// let alignColorsAndTime = winston.format.combine(
//   winston.format.colorize({
//     all: true,
//   }),
//   winston.format.label({
//     label: '[LOGGER]',
//   }),
//   winston.format.timestamp({
//     format: 'DD-MM-YY HH:MM:SS',
//   }),
//   winston.format.printf((info) => ` ${info.label} ${info.timestamp}`)
// );

const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 4,
  },

  // format: winston.format.simple(),
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((msg) =>
      colorizer.colorize(
        msg.level,
        `${msg.timestamp} - ${msg.level}: ${msg.message}`
      )
    )
  ),
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      timestamp: true,
    }),
  ],
  // level: dev ? 'debug' : 'info',
  // transports: [
  //   new winston.transports.Console({
  //     format: winston.format.combine(
  //       winston.format.colorize(),
  //       alignColorsAndTime
  //     ),
  //   }),
  // ],
});

module.exports = logger;
