import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { PORT } from "./varsconfig.js";
import authrouter from "./routes/authroutes.js";
import columnsrouter from "./routes/columnsroutes.js";
import projectsrouter from "./routes/projectsroutes.js";
import tasksrouter from "./routes/tasksroutes.js";
import authmiddleware from "./middlewares/authmiddleware.js";

import pool from "./config.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authrouter);
app.use("/columns", authmiddleware, columnsrouter);
app.use("/projects", authmiddleware, projectsrouter);
app.use("/tasks", authmiddleware, tasksrouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
