
import {ErrorResponse} from "./errorResponse";
import {Errors} from "./errors";

export class ResponseManager {
  constructor() {
    // Constructor stuff goes here...
  }

  private handleErrorResponse(res: any, err: ErrorResponse) {
    let statusCode: number = 500;
    switch (err.error) {
      case (Errors.authorizationError): {
        statusCode = 401;
        break;
      }
      case (Errors.badRequestError): {
        statusCode = 400;
        break;
      }
      case (Errors.databaseError): {
        statusCode = 503;
        break;
      }
      case (Errors.forbiddenError): {
        statusCode = 403;
        break;
      }
      case (Errors.noContentError): {
        statusCode = 204;
        break;
      }
      case (Errors.unProcessableEntity): {
        statusCode = 422;
        break;
      }
    }
    res.status(statusCode).send(err);
  }

  public send(req: any, res: any, err: ErrorResponse, result: any) {
    if (err) {
      this.handleErrorResponse(res, err);
    } else {
      res.status(200).send(result);
    }
  }
}