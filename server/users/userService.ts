/*Object*/
import * as bcrypt from "bcrypt";
import {AuthManager} from "../auth/authManager";
import {ErrorResponse} from "../responseManager/errorResponse";
import {Errors} from "../responseManager/errors";
import {User} from "./user";
import {UserConfig} from "./userConfig";
import {UserRepository} from "../dbLayer/repositories/userRepository";
import {ResponseManager} from "../responseManager/responseManager";

export class UserService {
    private authManager: AuthManager = new AuthManager();
    private userConfig: UserConfig = new UserConfig();
    private userRepository: UserRepository = new UserRepository();
    private responseManager: ResponseManager = new ResponseManager();

    public getAllUsers(next: Function) {
        this.userRepository.getAllUsers(next);
    }

    public getUser(user: User ,next: Function) {
        this.userRepository.getUser(user, next);
    }

    public authenticateUser(user: User, next: Function) {
        this.userRepository.getUser(user, (err: ErrorResponse, result: User) => {
            if (err) {
                next(err, null);
            } else if (!result) {
                let errorResponse: ErrorResponse = new ErrorResponse(Errors.authorizationError, "User not found !!!");
                next(errorResponse, null);
            } else {
                this.validatePassword(user.password, result.password, (validationError: ErrorResponse, isValid: boolean) => {
                    if (validationError) {
                        next(validationError, null);
                    } else if (!isValid) {
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.authorizationError, "Invalid Password !!!");
                        next(errorResponse, null);
                    } else {
                        let response: any = {
                            status: "Success",
                            token: this.authManager.generateAuthToken(result),
                            user: result
                        };
                        next(null, response);
                    }
                });
            }
        });
    }

    private validatePassword(expectedPassword: string, actualHashedPassword: string, next: Function) {
        bcrypt.compare(expectedPassword, actualHashedPassword, (err: any, response: boolean) => {
            if (err) {
                console.log("Password validation Error: ", err);
                let errorResponse: ErrorResponse = new ErrorResponse(Errors.internalServerError, "Something unexpected happened !!!");
                next(errorResponse, null);
            } else {
                next(null, response);
            }
        });
    }

    private encryptPassword(password: string, next: Function) {
        bcrypt.hash(password, this.userConfig.saltRounds, (err: any, hash: string) => {
            if (err) {
                console.log("Password encryption Error: ", err);
                let errorResponse: ErrorResponse = new ErrorResponse(Errors.internalServerError, "Something unexpected happened !!!");
                next(errorResponse, null);
            } else {
                next(null, hash);
            }
        });
    }

    public addUser(req: any, res: any, user: User, next: Function) {
        this.userRepository.getUser(user, (err: ErrorResponse, existingUser: User) => {
            if (err) {
                next(err, null);
            } else if (existingUser) {
                let errorResponse: ErrorResponse = new ErrorResponse(Errors.unProcessableEntity, "User Already Exists !!!");
                next(errorResponse, null);
            } else {
                this.encryptPassword(user.password, (err: ErrorResponse, hash: string) => {
                    if (err) {
                        return next(err, null);
                    }
                    let time: Date = new Date();

                    let token: any = req && req.headers ? req.headers['x-access-token'] : null;
                    if (token) {
                        this.authManager.verifyAuthToken(token, (err: ErrorResponse, decodedUser: any) => {
                            if (err) {
                                next(err, null);
                            } else {
                                if (decodedUser.role === this.userConfig.userRoles.admin) {
                                    user.role = Object.values(this.userConfig.userRoles).includes(req.body.role) ? req.body.role : this.userConfig.userRoles.editor;
                                } else {
                                    user.role = this.userConfig.userRoles.editor;
                                }
                                user.createdAt = time;
                                user.modifiedAt = time;
                                user.isActive = true;
                                user.password = hash;
                                this.userRepository.addUser(user, next);
                            }
                        });
                    } else {
                        user.role = this.userConfig.userRoles.editor;
                        user.createdAt = time;
                        user.modifiedAt = time;
                        user.isActive = true;
                        user.password = hash;
                        this.userRepository.addUser(user, next);
                    }

                });
            }
        });
    }
}