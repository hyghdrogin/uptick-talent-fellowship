import { Router as expRouter } from "express";
import roomRouter from "./rooms";
import userRouter from "./user";
import messageRouter from "./message";

const router = expRouter();

router.use("/room", roomRouter);
router.use("/users", userRouter);
router.use("/message", messageRouter);

export default router;