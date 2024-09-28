"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const checkUserType = (allowedUserTypes = []) => {
    return (req, res, next) => {
        if (req.currentUser) {
            if (!allowedUserTypes.includes(req.currentUser.accountType))
                (0, helpers_1.throwForbiddenError)("Forbidden");
            return next();
        }
        (0, helpers_1.throwUnauthorizedError)("User not authorized!!!");
    };
};
exports.default = checkUserType;
