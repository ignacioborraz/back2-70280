import CustomRouter from "../../utils/CustomRouter.util.js";
import companiesRouter from "./companies.api.js"
import eatsRouter from "./eats.api.js"
import ordersRouter from "./orders.api.js"
import sessionsRouter from "./sessions.api.js"

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/companies", ["PUBLIC"], companiesRouter);
    this.use("/eats", ["PUBLIC"], eatsRouter);
    this.use("/orders", ["PUBLIC"], ordersRouter);
    this.use("/auth", ["PUBLIC"], sessionsRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
