import {ConnectionFactory} from "../connectionManager/connectionFactory";
import {Errors} from "../../responseManager/errors";
import {ErrorResponse} from "../../responseManager/errorResponse";
import {IDBConnection} from "../connectionManager/iDBConnection";
import {User} from "../../users/user";

let log = require("../../../server/config/logger.js").LOG;

export class UserRepository {
    private connectionFactory: ConnectionFactory;
    private connectionManager: IDBConnection;

    constructor() {
        this.connectionFactory = new ConnectionFactory();
        this.connectionManager = this.connectionFactory.getConnectionManager();
    }

    public getAllUsers(next: Function) {
        this.connectionManager.getConnection((err: ErrorResponse, connection: any) => {
            if (err) {
                log.error(" getAllUsers : Unable to connect to db", err);
                return next(err, null);
            }
            try {
                connection.collection("user").find({}).toArray((err: any, users: User[]) => {
                    if (err) {
                        log.error("getAllUser : unable to get users", err);
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
                        return next(errorResponse, null);
                    }
                    log.debug("getAllUser : returning the users : ", users.length);
                    return next(null, users);
                });
            } catch (ex) {
                let exception: ErrorResponse = new ErrorResponse(Errors.internalServerError, ex);
                log.error("getAllUser : catch : Exception ", ex);
                return next(exception, null);
            }
        });
    }

    public getUser(user: User, next: Function) {
        this.connectionManager.getConnection((err: ErrorResponse, connection: any) => {
            if (err) {
                log.error("getUser :  Unable to connect to db : ", err);
                return next(err, null);
            }
            try {
                let query: any = {
                    $or: [
                        {username: user.username},
                        {email: user.email},
                        {mobile: user.mobile}
                    ]
                };
                connection.collection("user").findOne(query, (err: any, result: User) => {
                    if (err) {
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
                        log.error("getUser : unable to get the user : ", errorResponse);
                        return next(errorResponse, null);
                    }
                    log.debug("getUser : User Retrivied Successfully : ");
                    return next(null, result);
                });
            } catch (ex) {
                let exception: ErrorResponse = new ErrorResponse(Errors.internalServerError, ex);
                log.error("getUser : catch : Exception : ", ex);
                return next(exception, null);
            }
        });
    }

    public addUser(user: User, next: Function) {
        this.connectionManager.getConnection((err: ErrorResponse, connection: any) => {
            if (err) {
                log.error("addUser :  Unable to connect to db : ", err);
                return next(err, null);
            }
            try {
                connection.collection("user").insert(user, (err: any, result: any) => {
                    if (err) {
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
                        log.error("addUser: unable to add the user", err);
                        return next(errorResponse, null);
                    }
                    log.debug("addUser : User added Successfully : ", result._id);
                    return next(null, result);
                });
            } catch (ex) {
                let exception: ErrorResponse = new ErrorResponse(Errors.internalServerError, ex);
                log.error("addUser : catch : Exception : ", ex);
                next(exception, null);
            }
        });
    }
}