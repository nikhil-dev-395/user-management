import express from "express";
import cors from "cors";
import env from "./src/config/env.js";
import connectDB from "./src/db/connection.js";
import ApiResponse from "./src/response-handler/api-response.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const response = new ApiResponse(200, "server is running...");
  return res.status(response.statusCode).json(response);
});

const PORT = env.PORT;
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`serer is listening on PORT : ${PORT}`);
  });
})();
