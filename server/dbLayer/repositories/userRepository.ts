import {ConnectionFactory} from "../connectionManager/connectionFactory";
import {Errors} from "../../responseManager/errors";
import {ErrorResponse} from "../../responseManager/errorResponse";
import {IDBConnection} from "../connectionManager/iDBConnection";
import {User} from "../../users/user";

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
                return next(err, null);
            }
            try {
                connection.collection("user").find({}).toArray((err: any, users: User[]) => {
                    if (err) {
                        console.log("DB Layer Error: ", err);
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
                        return next(errorResponse, null);
                    }
                    return next(null, users);
                });
            } catch (ex) {
                console.log("DB Layer Error: ", ex);
                let exception: ErrorResponse = new ErrorResponse(Errors.internalServerError, ex);
                return next(exception, null);
            }
        });
    }

    public getUser(user: User, next: Function) {
        this.connectionManager.getConnection((err: ErrorResponse, connection: any) => {
            if (err) {
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
                        console.log("DB Layer Error: ", err);
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
                        return next(errorResponse, null);
                    }
                    console.log('Hello Result', result);
                    return next(null, result);
                });
            } catch (ex) {
                console.log("DB Layer Error: ", ex);
                let exception: ErrorResponse = new ErrorResponse(Errors.internalServerError, ex);
                return next(exception, null);
            }
        });
    }

    public addUser(user: User, next: Function) {
        this.connectionManager.getConnection((err: ErrorResponse, connection: any) => {
            if (err) {
                return next(err, null);
            }
            try {
                connection.collection("user").insert(user, (err: any, result: any) => {
                    if (err) {
                        console.log("addUser - DB Layer Error: ", err);
                        let errorResponse: ErrorResponse = new ErrorResponse(Errors.databaseError, err);
                        return next(errorResponse, null);
                    }
                    return next(null, result);
                });
            } catch (ex) {
                console.log("addUser - DB Layer Error: ", ex);
                let exception: ErrorResponse = new ErrorResponse(Errors.internalServerError, ex);
                next(exception, null);
            }
        });
    }
}