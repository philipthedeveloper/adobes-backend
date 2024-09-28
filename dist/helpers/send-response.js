"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendSuccessResponse = (res, data = {}, status = http_status_codes_1.StatusCodes.OK) => {
    res.status(status).json(Object.assign({ success: true, status }, data));
};
exports.sendSuccessResponse = sendSuccessResponse;
