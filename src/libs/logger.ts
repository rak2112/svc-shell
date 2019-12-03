import appRoot from "app-root-path";
import { createLogger, format, transports } from "winston";

// export const logger = createLogger({
//   format: combine(timestamp(), myFormat, format.colorize()),
//   transports: [
//     new transports.Console(),
//     new transports.File({
//       filename: `${appRoot}/logs/error.log`,
//       level: "error"
//     })
//   ]
// });
const level = process.env.LOG_LEVEL || "debug";
const { combine, timestamp, label, printf, splat, prettyPrint } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} -- ${level}: ${message}`;
});

export const logger = createLogger({
  format: combine(timestamp(), splat(), myFormat, format.colorize({ all: false })),
  transports: [
    new transports.Console({
      level: level
      // timestamp: function() {
      //   return new Date().toISOString();
      // }
    }),
    new transports.File({
      filename: `${appRoot}/logs/error.log`,
      level: "error"
    }),
    new transports.File({
      filename: `${appRoot}/logs/combined.log`,
      level: "silly"
    })
  ]
});
