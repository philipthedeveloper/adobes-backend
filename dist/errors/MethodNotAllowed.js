"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMethodNotAllowedError = void 0;
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("./CustomError"));
class MethodNotAllowedError extends CustomError_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.METHOD_NOT_ALLOWED;
    }
}
exports.default = MethodNotAllowedError;
const createMethodNotAllowedError = (message) => new MethodNotAllowedError(message);
exports.createMethodNotAllowedError = createMethodNotAllowedError;
