import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  addEats,
  readByUser,
  updateOneEat,
  removeOneEat,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], addEats);
    this.read("/", ["USER"], readByUser);
    this.update("/:orderId/:eatId/:quantity", ["USER"], updateOneEat);
    this.destroy("/:orderId/:eatId", ["USER"], removeOneEat);
  };
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
