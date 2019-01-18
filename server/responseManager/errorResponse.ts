
export class ErrorResponse {
  private _error: string;
  private _message: any;

  constructor(error: string, message: any) {
    this._error = error;
    this._message = message;
  }

  public get error() {
    return this._error;
  }

  public get message() {
    return this._message;
  }
}