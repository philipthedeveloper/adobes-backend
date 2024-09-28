"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const Conflict_1 = require("../errors/Conflict");
// Define a type guard function to check if an object implements CustomErrorInterface
function isCustomError(error) {
    return typeof error === "object" && "statusCode" in error;
    // Replace 'customProperty' with a property or method that uniquely identifies CustomErrorInterface
}
const errorHandler = (err, req, res, next) => {
    let errorObject = {};
    console.log(err);
    if (err instanceof CustomError_1.default && isCustomError(err)) {
        errorObject.status = err === null || err === void 0 ? void 0 : err.statusCode;
        errorObject.message = err.message;
    }
    if (err && err.name === "ValidationError") {
        errorObject.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
        errorObject.message = err.message;
    }
    if (err && err.code === 11000) {
        let message = Object.keys(err.keyValue).join(", ");
        let newConflictError = (0, Conflict_1.createConflictError)(`${message} already exist`);
        errorObject.status = newConflictError.statusCode;
        errorObject.message = newConflictError.message;
    }
    if (err &&
        (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")) {
        errorObject.message = err.message;
        errorObject.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
    if (err && err.name === "CastError") {
        errorObject.message = `${err === null || err === void 0 ? void 0 : err.value} is not a valid ${err === null || err === void 0 ? void 0 : err.kind}`;
        errorObject.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err &&
        (err.type === "entity.parse.failed" || err.name === "SyntaxError")) {
        errorObject.status = (err === null || err === void 0 ? void 0 : err.statusCode) || (err === null || err === void 0 ? void 0 : err.status);
        errorObject.message = "JSON"
            ? "Invalid JSON format in the request body. Please ensure there are no trailing commas."
            : "Syntax Error: Invalid data format.";
    }
    let status = (errorObject === null || errorObject === void 0 ? void 0 : errorObject.status) || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    return res.status(status).json({
        success: false,
        status,
        message: (errorObject === null || errorObject === void 0 ? void 0 : errorObject.message) || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
};
exports.default = errorHandler;
