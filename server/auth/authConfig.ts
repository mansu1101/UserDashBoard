import {UserConfig} from "../users/userConfig";

export class AuthConfig {
  private userConfig: UserConfig = new UserConfig();

  private _expiryTime: number = 3600 * 2; // expires in 2 hours
  private _secret: string = "477932ea7eddd9b0e63134d1d8ed9768";
  private _allowedResourceAccess: any = {
    "/users": {
      method: "GET",
      roles: [this.userConfig.userRoles.admin]
    },
    "/user/:id": {
      method: "GET",
      roles: [this.userConfig.userRoles.admin]
    }
  };

  public get expiryTime() {
    return this._expiryTime;
  }

  public get secret() {
    return this._secret;
  }

  public get allowedResourceAccess() {
    return this._allowedResourceAccess;
  }
}