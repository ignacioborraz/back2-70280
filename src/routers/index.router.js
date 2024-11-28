import CustomRouter from "../utils/CustomRouter.util.js";
import apiRouter from "./api/index.api.js";

class IndexRouter extends CustomRouter {
  constructor() {
    super(/* no necesito pasarle parametros a la clase CustomRouter */);
    this.init();
  }
  init = () => {
    this.use("/api", ["PUBLIC"], apiRouter);
  };
}

let indexRouter = new IndexRouter();
indexRouter = indexRouter.getRouter();
export default indexRouter;
