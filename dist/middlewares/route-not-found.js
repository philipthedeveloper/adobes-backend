"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const routeNotFound = (req, res) => {
    throw (0, errors_1.createNotFoundError)(`${req.url} does not exist`);
};
exports.default = routeNotFound;
