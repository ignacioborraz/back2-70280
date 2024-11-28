import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  create,
  read,
  update,
  destroy,
} from "../../data/mongo/managers/products.manager.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import verifyToken from "../../middlewares/verifyToken.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", readProducts);
    this.create("/", verifyToken, isAdmin, createProduct);
    this.update("/:id", passportCb("admin"), updateProduct);
    this.destroy("/:id", passportCb("admin"), destroyProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();

async function createProduct(req, res) {
  const message = "PRODUCT CREATED";
  const data = req.body;
  const response = await create(data);
  return res.status(201).json({ response, message });
}
async function readProducts(req, res) {
  const message = "PRODUCTS FOUND";
  const response = await read();
  return res.status(200).json({ response, message });
}
async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "PRODUCT UPDATED";
  const response = await update(id, data);
  return res.status(200).json({ response, message });
}
async function destroyProduct(req, res) {
  const { id } = req.params;
  const message = "PRODUCT DELETED";
  const response = await destroy(id);
  return res.status(200).json({ response, message });
}
