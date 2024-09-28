"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
const contactRouter = (0, helpers_1.routerCreator)();
contactRouter.post("/contact-org", controllers_1.submitContactRequest);
contactRouter.post("/submit-survey", controllers_1.submitSurvey);
exports.default = contactRouter;
