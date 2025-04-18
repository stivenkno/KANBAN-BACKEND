import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./varsconfig.js";
import authrouter from "./routes/authroutes.js";
import pool from "./config.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authrouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
