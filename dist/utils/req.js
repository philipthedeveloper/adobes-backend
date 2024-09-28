"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwErrorIfBodyIsEmpty = void 0;
const helpers_1 = require("../helpers");
const throwErrorIfBodyIsEmpty = (data, others, message) => {
    const isBodyEmpty = (0, helpers_1.checkEmptyRequestBody)(data);
    if (isBodyEmpty)
        (0, helpers_1.throwBadRequestError)(message || "Missing request body");
    if (others && others.length > 0) {
        for (const key of others) {
            if (!(key in data)) {
                (0, helpers_1.throwBadRequestError)(`Missing ${key} in request body`);
            }
        }
    }
};
exports.throwErrorIfBodyIsEmpty = throwErrorIfBodyIsEmpty;
