import express from "express";
import authmiddleware from "../middlewares/authmiddleware.js";
import {
  getcolumns,
  createColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/columnscontroller.js";

const columnsrouter = express.Router();

columnsrouter.get("/getcolumns", authmiddleware, getcolumns);
columnsrouter.post("/createcolumn", authmiddleware, createColumn);
columnsrouter.put("/updatecolumn", authmiddleware, updateColumn);
columnsrouter.delete("/deletecolumn", authmiddleware, deleteColumn);

export default columnsrouter;
