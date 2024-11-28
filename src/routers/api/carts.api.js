import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  create,
  read,
  update,
  destroy,
} from "../../data/mongo/managers/carts.manager.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], createCart);
    this.read("/:user_id", ["USER", "ADMIN"], readCartsFromUser);
    this.update("/:id", ["USER", "ADMIN"], updateCart);
    this.destroy("/:id", ["USER", "ADMIN"], destroyCart);
  };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();

async function createCart(req, res) {
  const message = "CART CREATED";
  const data = req.body;
  const response = await create(data);
  return res.status(201).json({ response, message });
}
async function readCartsFromUser(req, res) {
  const { user_id } = req.params;
  const message = "CARTS FOUND";
  const response = await read({ user_id });
  return res.status(200).json({ response, message });
}
async function updateCart(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "CART UPDATED";
  const response = await update(id, data);
  return res.status(200).json({ response, message });
}
async function destroyCart(req, res) {
  const { id } = req.params;
  const message = "CART DELETED";
  const response = await destroy(id);
  return res.status(200).json({ response, message });
}
