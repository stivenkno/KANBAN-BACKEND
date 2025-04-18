import express from "express";
import authmiddleware from "../middlewares/authmiddleware.js";
import { register, login } from "../controllers/authcontroller.js";

const authrouter = express.Router();

authrouter.post("/register", register);
authrouter.post("/login", login);

export default authrouter;
