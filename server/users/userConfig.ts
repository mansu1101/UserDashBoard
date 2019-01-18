
export class UserConfig {
  private _userRoles: any = {
    admin: "Admin",
    editor: "Editor"
  };
  private _saltRounds: number = 10;

  public get userRoles() {
    return this._userRoles;
  }

  public get saltRounds() {
    return this._saltRounds;
  }
}