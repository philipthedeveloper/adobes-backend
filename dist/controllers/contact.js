"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitSurvey = exports.submitContactRequest = void 0;
const utils_1 = require("../utils");
const helpers_1 = require("../helpers");
const submitContactRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    (0, utils_1.throwErrorIfBodyIsEmpty)(data, ["fullName", "email"], "Provide all required fields");
    yield (0, helpers_1.sendContactEmail)(data);
    return (0, helpers_1.sendSuccessResponse)(res, {
        message: "Form submitted successfully. Kindly await our response.",
    });
});
exports.submitContactRequest = submitContactRequest;
const submitSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    (0, utils_1.throwErrorIfBodyIsEmpty)(data, [], "Please provide all required fields");
    yield (0, helpers_1.submitSurveyEmail)(data);
    return (0, helpers_1.sendSuccessResponse)(res, { message: "Thank you for your time!" });
});
exports.submitSurvey = submitSurvey;
