
export class DbConfig {
  private static _instance: DbConfig;

  private _dbUrl: string;
  private _dbName: string;

  private constructor() {
    this._dbUrl = "mongodb://localhost:27017/data_store_point";
    this._dbName = "data_store_point";
  }

  public get dbUrl() {
    return this._dbUrl;
  }

  public get dbName() {
    return this._dbName;
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new DbConfig();
    }
    return this._instance;
  }
}