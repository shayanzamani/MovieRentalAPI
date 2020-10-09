const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      handleExceptions: true,
    })
  );
};
