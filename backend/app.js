import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import allocationRoutes from "./routes/allocationRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/allocation", allocationRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/subject", subjectRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/course", courseRoutes);

dbConnection();

app.use(errorMiddleware);

export default app;
