import { Router as roomRouter } from "express";
import { joinRoom, leaveRoom } from "../controllers";
import { authenticateUser } from "../middlewares/authentication";

const router = roomRouter();

router.post("/", authenticateUser, joinRoom);
router.get("/", authenticateUser, leaveRoom);

export default router;