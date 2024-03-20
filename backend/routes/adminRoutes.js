import express from "express";
import { isAuthorized } from "../middlewares/auth.js";
import { updateAdmin } from "../controllers/adminControllers.js";

const router = express.Router();

// Route to update admin user's data
router.put("/update", isAuthorized, updateAdmin);

export default router;
