import { Router } from "express";
import * as taskController from "../controllers/task.controller.js";

const router = Router();

router.get("/", taskController.getAll);
router.post("/", taskController.create);
router.put("/:id", taskController.update);
router.delete("/:id", taskController.remove);

export default router;
