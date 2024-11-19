import { Router } from "express";
import cartsApiRouter from "./carts.api.js";
import productsApiRouter from "./products.api.js";
import sessionsRouter from "./sessions.api.js";
import usersApiRouter from "./users.api.js";

const apiRouter = Router()

apiRouter.use("/users", usersApiRouter)
apiRouter.use("/products", productsApiRouter)
apiRouter.use("/carts", cartsApiRouter)
apiRouter.use("/sessions", sessionsRouter)

export default apiRouter