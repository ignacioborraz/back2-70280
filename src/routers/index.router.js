import { Router } from "express";
import apiRouter from "./api/index.api.js";

const indexRouter = Router()

//indexRouter.use("/", viewsRouter)
indexRouter.use("/api", apiRouter)

export default indexRouter