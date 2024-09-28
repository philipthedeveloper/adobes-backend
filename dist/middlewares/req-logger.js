"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    console.log(`${req.method} => ${req.url} => ${req.body}`);
    next();
};
exports.requestLogger = requestLogger;
exports.default = exports.requestLogger;
// module.exports = { morganLogger, errorLogger, requestLogger };
