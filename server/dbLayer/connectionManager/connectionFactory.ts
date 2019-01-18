import {IDBConnection} from "./iDBConnection";
import {MongoDbConnectionManager} from "./mongoDbConnectionManager";

export class ConnectionFactory {

  public getConnectionManager(): IDBConnection {
    return MongoDbConnectionManager.instance;
  }
}