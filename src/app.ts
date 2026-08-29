import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import path from "node:path";
import indexRoute from "./routes/index.route";

const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoute);

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/media", express.static(path.join(__dirname, "..", "upload")));

app.listen(PORT, () => {
  console.log(`Start server: http://localhost:${PORT}`);
});