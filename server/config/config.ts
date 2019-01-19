let path = require("path");
let rootPath = path.normalize(__dirname + "/../");

export class Config {
    private static _instance: Config;

    private _debugLogLevel: string;
    private _logDirectory: string;
    private _debugLogFileName: string;
    private _datePattern: string;
    private _maxFiles: number;

    private _errorLogLevel: string;
    private _errorLogFilename: string;

    private constructor() {
        this._logDirectory = rootPath + "/logs";
        this._debugLogLevel = "debug";
        this._debugLogFileName = rootPath + "/logs/_debug.log";
        this._maxFiles = 7;
        this._datePattern = "MM-d-yyyy";
        this._errorLogLevel = "error";
        this._errorLogFilename = rootPath + "/logs/_error.log";
    }

    public get logDirectory() {
        return this._logDirectory;
    }

    public get debugLogFileName() {
        return this._debugLogFileName;
    }

    public get debugLogLevel() {
        return this._debugLogLevel;
    }

    public get errorLogLevel() {
        return this._errorLogLevel;
    }
    public get datePattern() {
        return this._datePattern;
    }
    public get maxFiles() {
        return this._maxFiles;
    }

    public get errorLogFilename() {
        return this._errorLogFilename;
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new Config();
        }
        return this._instance;
    }
}