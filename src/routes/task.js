import { Router } from "express";
import TaskController from "../controllers/task.js";

const { createTask, readTask, readAllTasks, updateTask, deleteTask } = TaskController;

const router = Router();

router.post("/", createTask);

router.get("/:taskId", readTask);
router.get("/", readAllTasks);

router.patch("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

export default router;