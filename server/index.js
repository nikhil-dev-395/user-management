import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
// files
import env from "./src/config/env.js";
import logger from "./src/utils/logger.utils.js";
import connectDB from "./src/db/connection.js";
import ApiResponse from "./src/response-handler/api-response.js";
import { authRouter } from "./src/routes/auth.route.js";
import ApiError from "./src/response-handler/api-error.js";
const app = express();

// middleware
app.use(
  cors({
    origin: env.CLIENT_BASE_URL,
    credentials: true,
  }),
);

app.use(
  session({
    secret: env.SESSION_SECRET,
    maxAge: 24 * 60 * 60,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  const response = new ApiResponse(200, "server is running...");
  return res.status(response.statusCode).json(response);
});

app.use((err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    err = new ApiError(500, err.message || "Internal Server Error", [], err);
  }

  logger.error(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
    cause: env.NODE_ENV === "development" ? err.cause : null,
    stack: env.NODE_ENV === "development" ? err.stack : null,
  });
  next();
});

const PORT = env.PORT;
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`serer is listening on PORT : ${PORT}`);
  });
})();
