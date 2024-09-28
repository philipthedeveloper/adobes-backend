import "express-async-errors";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import {
  requestLogger,
  methodChecker,
  routeNotFound,
  errorHandler,
} from "./middlewares";
import { contactRouter } from "./routes";

// Configure env
dotenv.config();

// Initialize an express app
const app = express();

// Create node server
const server = http.createServer(app);

// Create a root router
const appRouter = express.Router();

// Env variables
const PORT = (process.env.PORT || 3000) as number;
const NODE_ENV = process.env.NODE_ENV;
const IPV4_ADDRESS = process.env.IPV4_ADDRESS;
const HOSTNAME =
  NODE_ENV === "development" ? IPV4_ADDRESS || "localhost" : null;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",")
  : [];

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.137.1:5173",
      "http://localhost:5000",
      ...corsOrigins,
    ],
    credentials: true,
  })
);

app.use(methodChecker); // Checks if the incoming request method is supported
app.use(express.urlencoded({ extended: true })); // Parse urlencoded data in request body
app.use(express.json({})); // Parse json data in request body

app.use(requestLogger); // Log any incoming request to the console

appRouter.use("/contact", contactRouter);
app.use("/adobes-marketing-agency/api/v1", appRouter);

app.get("/", (req, res) => {
  return res.send({
    success: true,
    message: "Hello! Adobes Marketing Agency backend system says hi!👋",
  });
});

// All route that are not handled from the top will be handled here
app.all("*", routeNotFound); // Returns a 404 response for such routes
app.use(errorHandler); // Handles all error in the app

server.on("error", (error: any) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Trying a different port...`);
    const NEW_PORT = Number(PORT) + 1;
    server.listen(NEW_PORT, HOSTNAME || "", () => {
      console.log(`Server is running on http://${HOSTNAME}:${NEW_PORT}`);
    });
  } else {
    console.error("Server error:", error);
  }
});

const startServer = () => {
  server.listen(PORT, HOSTNAME || "", () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
  });
};

startServer();
