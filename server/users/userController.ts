import {ErrorResponse} from "../responseManager/errorResponse";
import {ResponseManager} from "../responseManager/responseManager";
import {User} from "./user";
import {UserService} from "./userService";
let log = require("../../server/config/logger.js").LOG;

export class UserController {
    private responseManager: ResponseManager = new ResponseManager();
    private userService: UserService = new UserService();

    public listUsers(req: any, res: any) {
        this.userService.getAllUsers((err: ErrorResponse, users: User[]) => {
            this.responseManager.send(req, res, err, users);
        });
    }

    public addUser(req: any, res: any) {
        let user: User = new User(req.body);
        this.userService.addUser(req, res, user, (err: ErrorResponse, result: any) => {
            this.responseManager.send(req, res, err, result);
        });
    }

    public getUser(req: any, res: any){
        let user : User = new User({username: req.params.id});
        this.userService.getUser(user,(err: ErrorResponse, users: User[]) => {
            this.responseManager.send(req, res, err, users);
        });
    }

    public authenticateUser(req: any, res: any) {
        let user: User = new User(req.body);
        this.userService.authenticateUser(user, (err: ErrorResponse, result: any) => {
            this.responseManager.send(req, res, err, result);
        });
    }
}