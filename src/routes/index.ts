import { Router } from "express";
import taskRouter from "./task";
import deleteRouter from "./deleted";

const router = Router();

router.use("/task", taskRouter);
router.use("/deleted", deleteRouter);

export default router;