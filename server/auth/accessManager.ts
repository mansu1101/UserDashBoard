import {AuthConfig} from "./authConfig";

export class AccessManager {
  private authConfig: AuthConfig = new AuthConfig();

  public isAllowedToAccess(resource: string, method: string, role: string) {
    let resourceAccessInfo: any = this.authConfig.allowedResourceAccess[resource];
    if (resourceAccessInfo && resourceAccessInfo.method === method && resourceAccessInfo.roles.includes(role)) {
      return true;
    }
    return false;
  }
}