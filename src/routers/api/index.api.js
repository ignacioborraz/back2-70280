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
    this.use("/users", ["PUBLIC"], usersApiRouter);
    this.use("/products", ["PUBLIC"], productsApiRouter);
    this.use("/carts", ["PUBLIC"], cartsApiRouter);
    this.use("/sessions", ["PUBLIC"], sessionsApiRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
