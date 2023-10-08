import { Router as messageRouter } from "express";
import { initMessageSocket } from "../controllers";
import { authenticateUser } from "../middlewares/authentication";

const router = messageRouter();

router.post("/",authenticateUser, initMessageSocket);

export default router;