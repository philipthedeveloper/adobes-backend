"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const ALLOWED_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
    "HEAD",
];
const methodChecker = (req, res, next) => {
    if (!ALLOWED_METHODS.includes(req.method.toUpperCase()))
        throw (0, errors_1.createMethodNotAllowedError)(http_status_codes_1.ReasonPhrases.METHOD_NOT_ALLOWED);
    next();
};
exports.default = methodChecker;
