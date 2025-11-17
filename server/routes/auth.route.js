import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/logout", logout);

export default router;
