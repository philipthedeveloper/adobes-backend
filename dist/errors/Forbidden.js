"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForbiddenError = void 0;
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("./CustomError"));
class ForbiddenError extends CustomError_1.default {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.FORBIDDEN;
    }
}
exports.default = ForbiddenError;
const createForbiddenError = (message) => new ForbiddenError(message);
exports.createForbiddenError = createForbiddenError;
