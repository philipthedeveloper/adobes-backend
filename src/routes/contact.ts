import { routerCreator } from "../helpers";
import { submitContactRequest, submitSurvey } from "../controllers";

const contactRouter = routerCreator();

contactRouter.post("/contact-org", submitContactRequest);
contactRouter.post("/submit-survey", submitSurvey);

export default contactRouter;
