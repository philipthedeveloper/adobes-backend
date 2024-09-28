"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmptyRequestBody = void 0;
const checkEmptyRequestBody = (data) => Object.keys(data).length === 0;
exports.checkEmptyRequestBody = checkEmptyRequestBody;
