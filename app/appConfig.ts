
export class AppConfig {
  private _port: number = 5555;

  get port() {
    return this._port;
  }
}