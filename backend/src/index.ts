import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;
if (!PORT) throw new Error("PORT is missing in your env file");

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:%d", PORT);
});
