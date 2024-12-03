import CustomRouter from "../../utils/CustomRouter.util.js";
import { fork } from "child_process";
import sum from "../../utils/process.util.js";
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
    this.read("/sum", ["PUBLIC"], (req, res) => {
      //const response = sum();
      //const message = "SUMATORIA OBTENIDA";
      //return res.json200(response, message);
      const child = fork("./src/utils/process.util.js");
      child.send("start");
      child.on("message", (response) => {
        const message = "SUMATORIA OBTENIDA";
        return res.json200(response, message);
      });
    });
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
