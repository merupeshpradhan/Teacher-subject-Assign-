import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);
router.get("/getuser", isAuthorized,getUser);
router.post("/update/:id", isAuthorized,updateUser);
router.get("/getUserById/:id", isAuthorized,getUserById);

export default router;
