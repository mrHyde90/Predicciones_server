"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.httpServer = new http_1.default.Server(this.app);
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.start = function (port) {
        this.httpServer.listen(process.env.PORT || port, function () { console.log("Aplicion arriba"); });
    };
    return Server;
}());
exports.default = Server;
