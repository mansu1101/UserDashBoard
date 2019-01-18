export class Errors {
  private static _authorizationError: string = "Unauthorized";
  private static _badRequestError: string = "Bad_Request";
  private static _databaseError: string = "Service_Unavailable";
  private static _forbiddenError: string = "Forbidden";
  private static _internalServerError: string = "Internal_Server_Error";
  private static _noContentError: string = "No_Content";
  private static _unProcessableEntity: string = "Unprocessable_Entity";

  public static get authorizationError() {
    return this._authorizationError;
  }

  public static get badRequestError() {
    return this._badRequestError;
  }

  public static get databaseError() {
    return this._databaseError;
  }

  public static get forbiddenError() {
    return this._forbiddenError;
  }

  public static get internalServerError() {
    return this._internalServerError;
  }

  public static get noContentError() {
    return this._noContentError;
  }

  public static get unProcessableEntity() {
    return this._unProcessableEntity;
  }
}