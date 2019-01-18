import * as Ajv from "ajv";
import {AccessManager} from "../auth/accessManager";
import {AuthManager} from "../auth/authManager";
import {JsonSchemas} from "./jsonSchemas";
import {Errors} from "../responseManager/errors";
import {ErrorResponse} from "../responseManager/errorResponse";
import {ResponseManager} from "../responseManager/responseManager";

export class RequestValidator {
  private _ajv: any;
  private accessManager: AccessManager = new AccessManager();
  private authManager: AuthManager = new AuthManager();
  private responseManager: ResponseManager = new ResponseManager();

  constructor() {
    this._ajv = Ajv({allErrors: true, removeAdditional: "all"});
    this._ajv.addSchema(JsonSchemas.NewUser, "NewUser");
  }

  /**
   * Format error responses
   * @param  {Object} schemaErrors - array of json-schema errors, describing each validation failure
   * @return {String} formatted api response
   */
  private errorResponse(schemaErrors: any[]) {
    let errors: any[] = schemaErrors.map((error: any) => {
      return {
        path: error.dataPath,
        message: error.message
      };
    });
    return {
      status: "Request validation failed !!!",
      errors: errors
    };
  }

  private validateSchema(schemaName: string, requestBody: any) {
    let valid: boolean = this._ajv.validate(schemaName, requestBody);
    if (!valid) {
      let errorResponse: ErrorResponse = new ErrorResponse(Errors.badRequestError, this.errorResponse(this._ajv.errors));
      return {
        error: errorResponse,
        isValid: valid
      };
    }
    return {
      error: null,
      isValid: valid
    };
  }

  /**
   * Validates incoming request and request bodies against the given schema,
   * providing an error response when validation fails
   * @param {String} schemaName - name of the schema to validate
   * @param tokenRequired - Flag to decide whether token is required or not
   * @param restricted - Flag to decide whether resource and method is restricted or not
   * @return {Object} response
   */
  public validateRequest(schemaName: string, tokenRequired: boolean, restricted?: boolean) {
    return (req: any, res: any, next: Function) => {
      if (tokenRequired) {
        let token: any = req.headers['x-access-token'];
        if (!token) {
          let errorResponse: ErrorResponse = new ErrorResponse(Errors.badRequestError, "No Authorization token provided !!!");
          return this.responseManager.send(req, res, errorResponse, null);
        }
        this.authManager.verifyAuthToken(token, (err: ErrorResponse, decodedUser: any) => {
          if (err) {
            return this.responseManager.send(req, res, err, null);
          }
          if (restricted) {
            if (!this.accessManager.isAllowedToAccess(req.route.path, req.method, decodedUser.role)) {
              let errorResponse: ErrorResponse = new ErrorResponse(Errors.forbiddenError, "Not Allowed to perform this action.");
              return this.responseManager.send(req, res, errorResponse, null);
            }
          }
          if (schemaName) {
            let validationResult: any = this.validateSchema(schemaName, req.body);
            if (validationResult.error) {
              return this.responseManager.send(req, res, validationResult.error, null);
            }
          }
          next();
        });
      } else {
        if (schemaName) {
          let validationResult: any = this.validateSchema(schemaName, req.body);
          if (validationResult.error) {
            return this.responseManager.send(req, res, validationResult.error, null);
          }
        }
        next();
      }
    }
  }
}