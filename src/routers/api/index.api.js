import { Router } from "express";
import productsApiRouter from "./products.api.js";

const apiRouter = Router()

apiRouter.use("/products", productsApiRouter)

export default apiRouter