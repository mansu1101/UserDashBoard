import {App} from './app/app';
import {AppConfig} from "./app/appConfig";

const app = new App().app;
const appConfig = new AppConfig();
const port = process.env.PORT || appConfig.port;

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('server is listening on port - ', port);
});

process.on('uncaughtException', function (err) {
  // This should not happen
  console.log("Pheew ...! Something unexpected happened. This should be handled more gracefully. I am sorry. The culprit is: ", err);
});