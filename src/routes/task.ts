import { Router } from "express";
import { createTask, readTask, readAllTasks, updateTask, deleteTask } from "../controllers";

const router = Router();

router.post("/", createTask);

router.get("/:taskId", readTask);
router.get("/", readAllTasks);

router.patch("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

export default router;