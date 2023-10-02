import { Router } from "express";

import { deletedTask } from "../controllers";

const router = Router();

router.get("/task", deletedTask);

export default router;