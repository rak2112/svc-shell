import { config } from "./config";
import { logger } from "./libs";
import { Database } from "./services/Database";

// DB Connection
Database.open({ dbConnectionString: config.dbConnectionString })
  .then(() => {
    const { Server } = require("./Server"); // tslint:disable-line

    const server = new Server(config);
    server.init();

    const runningServer = server.application.listen(config.port);

    runningServer.on("listening", async () => {
      const ann = `|| App is running at port "${config.port}" in "${config.nodeEnv}" mode ||`;
      logger.info(ann.replace(/[^]/g, "-"));
      logger.info(ann);
      logger.info(ann.replace(/[^]/g, "-"));
      logger.info("Press CTRL-C to stop\n");
    });

    runningServer.on("error", err => {
      logger.debug(":::::: GOT ERROR IN STARTING SERVER ::::::");
      logger.error(err);
    });

    runningServer.on("close", () => {
      logger.debug(`:::::: CLOSING SERVER RUNNING ON "${config.port}" IN "${config.nodeEnv}" MODE ::::::`);
    });
  })
  .catch(err => {
    logger.debug(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
    logger.error(err);
  });
