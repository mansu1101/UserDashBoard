import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as morgan from "morgan";
import {RouteManager} from "./routeManager";

export class App {
  public _app: any;

  constructor() {
    this._app = express();
    // parse application/x-www-form-urlencoded
    this._app.use(bodyParser.urlencoded({extended: false}));
    // parse application/json
    this._app.use(bodyParser.json());
    this._app.use(morgan("dev"));
    this._app.use(cors({origin: 'http://localhost:4200'}));
    new RouteManager(this._app);
  }

  get app() {
    return this._app;
  }
}