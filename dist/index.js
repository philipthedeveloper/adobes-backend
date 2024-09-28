"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
// Configure env
dotenv_1.default.config();
// Initialize an express app
const app = (0, express_1.default)();
// Create node server
const server = http_1.default.createServer(app);
// Create a root router
const appRouter = express_1.default.Router();
// Env variables
const PORT = (process.env.PORT || 3000);
const NODE_ENV = process.env.NODE_ENV;
const IPV4_ADDRESS = process.env.IPV4_ADDRESS;
const HOSTNAME = NODE_ENV === "development" ? IPV4_ADDRESS || "localhost" : null;
const corsOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : [];
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://192.168.137.1:5173",
        "http://localhost:5000",
        ...corsOrigins,
    ],
    credentials: true,
}));
app.use(middlewares_1.methodChecker); // Checks if the incoming request method is supported
app.use(express_1.default.urlencoded({ extended: true })); // Parse urlencoded data in request body
app.use(express_1.default.json({})); // Parse json data in request body
app.use(middlewares_1.requestLogger); // Log any incoming request to the console
appRouter.use("/contact", routes_1.contactRouter);
app.use("/adobes-marketing-agency/api/v1", appRouter);
app.get("/", (req, res) => {
    return res.send({
        success: true,
        message: "Hello! Adobes Marketing Agency backend system says hi!👋",
    });
});
// All route that are not handled from the top will be handled here
app.all("*", middlewares_1.routeNotFound); // Returns a 404 response for such routes
app.use(middlewares_1.errorHandler); // Handles all error in the app
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Trying a different port...`);
        const NEW_PORT = Number(PORT) + 1;
        server.listen(NEW_PORT, HOSTNAME || "", () => {
            console.log(`Server is running on http://${HOSTNAME}:${NEW_PORT}`);
        });
    }
    else {
        console.error("Server error:", error);
    }
});
const startServer = () => {
    server.listen(PORT, HOSTNAME || "", () => {
        console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
    });
};
startServer();
