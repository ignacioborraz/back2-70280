import CustomRouter from "../../utils/CustomRouter.util.js";
import cartsApiRouter from "./carts.api.js";
import productsApiRouter from "./products.api.js";
import sessionsApiRouter from "./sessions.api.js";
import usersApiRouter from "./users.api.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/users", usersApiRouter);
    this.use("/products", productsApiRouter);
    this.use("/carts", cartsApiRouter);
    this.use("/sessions", sessionsApiRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
