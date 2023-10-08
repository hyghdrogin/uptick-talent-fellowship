import { Router as userRouter } from "express";
import { getUser, registerUser } from "../controllers";

const router = userRouter();

router.post("/", registerUser);
router.get("/:userName", getUser);

export default router;