import express from "express";
import authmiddleware from "../middlewares/authmiddleware.js";
import {
  getprojects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectscontroller.js";

const projectsrouter = express.Router();

projectsrouter.get("/getprojects", authmiddleware, getprojects);
projectsrouter.post("/createproject", authmiddleware, createProject);
projectsrouter.put("/updateproject", authmiddleware, updateProject);
projectsrouter.delete("/deleteproject", authmiddleware, deleteProject);

export default projectsrouter;
