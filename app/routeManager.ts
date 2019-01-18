import * as path from "path";
import * as express from "express";
import {RequestValidator} from "../server/validation/requestValidator";
import {UserController} from "../server/users/userController";

export class RouteManager {
  private app: any;
  private requestValidator: RequestValidator = new RequestValidator();

  constructor(app: any) {
    this.app = app;
    this.mountRoutes();
  }

  private createDefaultRoute(): void {
    this.app.use(express.static(path.resolve(__dirname + "/../" + "/public")));
  }

  private createUsersRoute(): void {
    let userController: UserController = new UserController();
    this.app.get("/users", this.requestValidator.validateRequest(null, true, true),
        userController.listUsers.bind(userController));
    this.app.get("/user/:id", this.requestValidator.validateRequest(null, true, true),
        userController.getUser.bind(userController));
    this.app.post("/signUp", this.requestValidator.validateRequest("NewUser", false),
        userController.addUser.bind(userController));
    this.app.post("/login", userController.authenticateUser.bind(userController));
  }


  private mountRoutes() {
    this.createDefaultRoute();
    this.createUsersRoute();
  }
}