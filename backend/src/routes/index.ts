import { Router } from "express";
import taskRouter from "./task.route.js";

const router = Router();

router.use("/tasks", taskRouter);

export default router;
