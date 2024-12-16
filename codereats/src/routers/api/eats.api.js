import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createOne,
  readOne,
  readAll,
  updateOne,
  destroyOne,
} from "../../controllers/eats.controller.js";

class EatsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createOne);
    this.read("/:id", ["PUBLIC"], readOne);
    this.read("/", ["PUBLIC"], readAll);
    this.update("/:id", ["ADMIN"], updateOne);
    this.destroy("/:id", ["ADMIN"], destroyOne);
  };
}

const eatsRouter = new EatsRouter();
export default eatsRouter.getRouter();
