import express from "express";
import authmiddleware from "../middlewares/authmiddleware.js";
import {
  gettasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskscontroller.js";

const tasksrouter = express.Router();

tasksrouter.get("/gettasks", authmiddleware, gettasks);
tasksrouter.post("/createtask", authmiddleware, createTask);
tasksrouter.put("/updatetask", authmiddleware, updateTask);
tasksrouter.delete("/deletetask", authmiddleware, deleteTask);

export default tasksrouter;
