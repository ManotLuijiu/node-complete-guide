const winston = require('winston');
const { format } = winston;
const { combine, colorize, timestamp, printf } = format;

const getFileNameAndLineNumber = function getFileNameAndLineNumber(
  numberOfLinesToFetch = 1
) {
  const oldStackTrace = Error.prepareStackTrace;

  const boilerplateLines = (line) =>
    line &&
    line.getFileName() &&
    line.getFileName().indexOf('<The Name of This Module>') &&
    line.getFileName().indexOf('/node_modules/') < 0;

  try {
    Error.prepareStackTrace = (err, structuredStackTrace) =>
      structuredStackTrace;
    Error.captureStackTrace(this);

    const callSites = this.stack.filter(boilerplateLines);
    if (callSites.length === 0) {
      return null;
    }
    const results = [];
    for (let i = 0; i < numberOfLinesToFetch; i++) {
      const callSite = callSites[i];
      let fileName = callSite.getFileName();
      fileName = fileName.includes(BASE_DIR_NAME)
        ? fileName.substring(BASE_DIR_NAME.length + 1)
        : fileName;
      results.push(fileName + ':' + callSite.getLineNumber());
    }
    return results.join('\n');
  } finally {
    Error.prepareStackTrace = oldStackTrace;
  }
};

function humanReadableFormatter({ level, message, ...metadata }) {
  const filename = getFileNameAndLineNumber();
  return `[${level}] [${filename}] ${message} ${JSON.stringify(metadata)}`;
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: { all: true },
      stderrLevels: ['error', 'alert', 'critical', 'bizAlert'],
      format: combine(colorize(), timestamp(), humanReadableFormatter),
    }),
  ],
});

logger.info('test print', { a: 1, b: 2 });
