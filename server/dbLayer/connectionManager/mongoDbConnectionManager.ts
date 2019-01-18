
import {DbConfig} from "./dbConfig";
import {Errors} from "../../responseManager/errors";
import {ErrorResponse} from "../../responseManager/errorResponse";
import {IDBConnection} from "./iDBConnection";
import * as mongodb from "mongodb";

export class MongoDbConnectionManager implements IDBConnection {
  private dbConnectionCache: any;
  private mongoClient: any;
  private static _instance: MongoDbConnectionManager;

  private constructor() {
    this.dbConnectionCache = {};
    this.mongoClient = mongodb.MongoClient;
  }

  public getConnection(next: Function) {
    let dbConfig: DbConfig = DbConfig.instance;
    let dbObject = null;
    if (this.dbConnectionCache.dbUrl === dbConfig.dbUrl) {
      dbObject = this.dbConnectionCache.db;
    }
    if (dbObject) {
      next(null, dbObject);
    } else {
      this.mongoClient.connect(dbConfig.dbUrl, (err: any, client: any) => {
        if (err) {
          let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
          return next(errorResponse, null);
        }
        const db = client.db(dbConfig.dbName);
        this.dbConnectionCache = {dbUrl: dbConfig.dbUrl, db: db};
        next(null, db);
      });
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new MongoDbConnectionManager();
    }
    return this._instance;
  }
}