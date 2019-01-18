import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import {AuthConfig} from "./authConfig";
import {ErrorResponse} from "../responseManager/errorResponse";
import {Errors} from "../responseManager/errors";
import {User} from "../users/user";

export class AuthManager {
  private authConfig: AuthConfig = new AuthConfig();

  public generateAuthToken(user: User) {
    user.key = crypto.randomBytes(32).toString('hex');
    // create a token
    let token: any = jwt.sign(user, this.authConfig.secret, {
      expiresIn: this.authConfig.expiryTime
    });
    return token;
  }

  public verifyAuthToken(token: any, next: Function) {
    jwt.verify(token, this.authConfig.secret, (err: any, decoded: any) => {
      if (err) {
        let errorResponse: ErrorResponse = new ErrorResponse(Errors.forbiddenError, err);
        return next(errorResponse, null);
      }
      next(null, decoded);
    });
  }
}