import {App} from './app/app';
import {AppConfig} from "./app/appConfig";

const app = new App().app;
const appConfig = new AppConfig();
const port = process.env.PORT || appConfig.port;
let logger = require("./server/config/logger.js");
let log = logger.LOG;
logger.createLogDirectory();
app.listen(port, (err) => {
  if (err) {
    log.error(err);
    return console.log(err);
  }
  log.debug("Listing on PORT number : ", port);
  return;
});

process.on('uncaughtException', function (err) {
  // This should not happen
  log.error("Pheew ...! Something unexpected happened. This should be handled more gracefully. I am sorry. The culprit is: ", err);
});