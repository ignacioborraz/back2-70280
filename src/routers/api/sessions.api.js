import { Router } from "express";
import { create } from "../../data/mongo/managers/users.manager.js";
import isVerifyPassword from "../../middlewares/isVerifyPassword.mid.js";

const sessionsRouter = Router()

sessionsRouter.post("/register")

sessionsRouter.post("/login")

sessionsRouter.post("/signout")

sessionsRouter.post("/online")

export default sessionsRouter