import { Router } from "express";
import loginRouter from "./login";

const router = Router();

router.use("/login", loginRouter);

export default router;
